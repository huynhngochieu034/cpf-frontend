
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SignUpInfo } from '../http/signup-info';
import { AuthLoginInfo } from '../http/login-info';
import { JwtResponse } from '../http/jwt-response';
import { Router } from '@angular/router';





export interface Credentials {
  username: string;
  token: string;
  isAdmin: boolean;
}

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}


/**
 * Key determine 'credential' in cache/local storage.
 */
const credentialsKey = 'credentials';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {


  private loginUrl = 'http://localhost:8181/api/auth/signin';
  private signupUrl = 'http://localhost:8181/api/auth/signup';
  private loginInfo: AuthLoginInfo;
  private roles: Array<string> = [];


  private _credentials: Credentials | null;
  authChanged$ = new Subject();
  private _tempUserName: string;

  constructor(private http: HttpClient, private router: Router) {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
  * Authenticates the user.
  * @param context The login parameters.
  */
  login(context: LoginContext) {
    this.loginInfo = new AuthLoginInfo(context.username, context.password);
    this.attemptAuth(this.loginInfo).subscribe(
      data => {
        const dataUser = {
          username: data.username,
          token: data.accessToken,
          isAdmin: true
        };
        this._tempUserName = data.username;
        this.setCredentials(dataUser, context.remember);
        this.router.navigate(['/home']);
      },
      error => {
        console.log(error);
        alert("Sai tai khoan hoac mat khau");
        //this.errorMessage = error.error.message;
        //this.isLoginFailed = true;
        this.router.navigate(['/auth/login']);
      }
    );
  }

  /**
   * Authenticates the user.
   * @param context The login parameters.
   */
  // login(context: LoginContext): Observable<any> {
  //   const data = {
  //     username: context.username,
  //     token: this.getToken(),
  //     isAdmin: context.username.toLowerCase() === 'admin' ? true : false
  //   };
  //   this._tempUserName = context.username;
  //   this.setCredentials(data, context.remember);
  //   return of(true);
  // }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  public getToken(): string {
    if (localStorage != null) {
      return localStorage.getItem(TOKEN_KEY);
    } else {
      return sessionStorage.getItem(TOKEN_KEY);
    }
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }

    return this.roles;
  }

  /**
   * Logs out the user and clear credentials.
   */
  logout(): Observable<any> {
    if (!this._tempUserName) {
      if (localStorage) {
        var logOut = JSON.parse(localStorage.getItem(credentialsKey));
      } else {
        var logOut = JSON.parse(sessionStorage.getItem(credentialsKey));
      }
      this._tempUserName = logOut.username;
    }
    this.setCredentials();
    return of(this._tempUserName);
  }

  /**
   * Checks is the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this._credentials;
  }

  /**
   * Gets the user credentials.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;
    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
      storage.setItem(USERNAME_KEY, credentials.username);
      this.authChanged$.next();
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
      sessionStorage.removeItem(USERNAME_KEY);
      localStorage.removeItem(USERNAME_KEY);
    }
  }
}

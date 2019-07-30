import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

/**
 * A route strategy allowing for explicit route reuse.
 * Used as a workaround for https://github.com/angular/angular/issues/18374
 * To reuse a given route, add `data: { reuse: true }` to the route definition.
 */
export class RouteReusableStrategy extends RouteReuseStrategy {
  /**
   * Determines if this route (and its subtree) should be detached to be reused later
   * @param route Route
   */
  public shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  /**
   * Stores the detached route.
   * Storing a null value should erase the previously stored value.
   * @param route Route
   * @param detachedTree Detached Tree
   */
  public store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle | null): void {}

  /**
   * Determines if this route (and its subtree) should be reattached
   * @param route Route
   */
  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  /**
   * Determines if this route (and its subtree) should be reattached
   * @param route Route
   */
  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return null;
  }

  /**
   * Determines if this route (and its subtree) should be reattached
   * @param future Feature route
   * @param curr Current route
   */
  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig || future.data.reuse;
  }
}

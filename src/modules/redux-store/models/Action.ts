/**
 * Action that has only type property
 * Example:
 *   {
 *     type: SOME_ACTION
 *   }
 */
export interface Action<T extends string> {
  type: T;
}

/**
 * Action that has both type and payload
 * Example:
 *   {
 *     type: SOME_ACTION
 *     payload: {
 *         user?: user
 *     }
 *   }
 */
export interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P;
}

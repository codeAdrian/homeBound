import { Action, ActionWithPayload } from '../models';

/**
 * Create action that dispatches only Type
 * Example: SomethingRequest
 */
export function createAction<T extends string>(type: T): Action<T>;

/**
 * Create action that dispatches type and payload
 * Example: SomethingSuccess | SomethingError
 */
export function createAction<T extends string, P>(
  type: T,
  payload: P,
): ActionWithPayload<T, P>;

/**
 * Create action that dispatches type and optional payload
 * This one is used for allowing resolution between the previous two as overloads
 */
export function createAction<T extends string, P>(type: T, payload?: P) {
  return !payload ? { type } : { type, payload };
}

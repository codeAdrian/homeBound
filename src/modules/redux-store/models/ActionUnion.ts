import { ActionCreatorsMapObject } from 'redux';

/** This type is used for merging All actions of the same type
 * Example:
 * type RegistrationAction =
 *  | RegistrationRequest
 *  | RegistrationSuccess
 *  | RegistrationError;
 */
export type ActionUnion<A extends ActionCreatorsMapObject> = ReturnType<
  A[keyof A]
>;

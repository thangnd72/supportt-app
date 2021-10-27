import { DialogMessage } from "models/message";
import { Reducer as ReduxReducer } from "redux";
import { ThunkAction } from "store/configureAction";
import { ActionType } from "./ActionType";
import { AuthenticateState, InitState } from "./InitState";
import { LoginUser } from "models/auth";
import store from "store/configureStore";

interface LoadedAction {
  type: string;
}

interface FieldChangeAction {
  type: string;
  fieldName: string;
  fieldValue?: any;
}

type KnownAction = FieldChangeAction | LoadedAction;

export const ActionCreators = {
  Loading: (): ThunkAction<KnownAction> => (dispatch, getState) => {
    dispatch({
      type: ActionType.LOADING,
    });
  },
  FieldChange:
    (fieldName: string, fieldValue: any): ThunkAction<KnownAction> =>
    (dispatch, getState) => {
      dispatch({
        type: ActionType.FIELD_CHANGE,
        fieldName: fieldName,
        fieldValue: fieldValue,
      });
    },
};

export const Reducer: ReduxReducer<AuthenticateState, KnownAction> = (
  state: AuthenticateState | undefined,
  incomingAction: KnownAction
): AuthenticateState => {
  if (state == undefined) {
    return InitState;
  }

  let action;
  switch (incomingAction.type) {
    case ActionType.LOADING:
      return {
        ...state,
        message: {
          ...state.message,
          display: false,
        },
        commited: false,
      };
    case ActionType.FIELD_CHANGE:
      action = incomingAction as FieldChangeAction;

      return {
        ...state,
        [action.fieldName]: action.fieldValue,
      };

    default:
      return state;
  }
};

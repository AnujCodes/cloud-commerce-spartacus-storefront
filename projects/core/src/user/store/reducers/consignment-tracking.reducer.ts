import { ConsignmentTracking } from '../../../model/index';
import * as fromAction from '../actions/consignment-tracking.action';
import { ConsignmentTrackingState } from '../user-state';

export const initialState: ConsignmentTrackingState = {
  tracking: {},
};

export function reducer(
  state = initialState,
  action: fromAction.ConsignmentTrackingAction
): ConsignmentTrackingState {
  switch (action.type) {
    case fromAction.LOAD_CONSIGNMENT_TRACKING_SUCCESS: {
      const tracking: ConsignmentTracking = action.payload;
      return {
        tracking,
      };
    }
  }
  return state;
}

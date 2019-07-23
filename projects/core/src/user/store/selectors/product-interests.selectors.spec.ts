import { TestBed } from '@angular/core/testing';

import { Store, StoreModule, select } from '@ngrx/store';

import { StateWithUser, USER_FEATURE } from '../user-state';
import * as fromReducers from '../reducers/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { ProductInterestList } from '../../../model/product-interest.model';

import { UserActions } from '../actions/index';
import { UsersSelectors } from '../selectors/index';

const emptyInterestList: ProductInterestList = {
  results: [],
  sorts: [],
  pagination: {},
};
const mockedInterestList: ProductInterestList = {
  results: [],
  sorts: [
    {
      code: 'name',
      asc: true,
    },
  ],
  pagination: {
    page: 0,
    count: 1,
    totalCount: 1,
    totalPages: 1,
  },
};

describe('Product Interests Selectors', () => {
  let store: Store<StateWithUser>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(USER_FEATURE, fromReducers.getReducers()),
      ],
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getInterestsState', () => {
    it('should return product interests state', () => {
      let result: LoaderState<ProductInterestList>;
      store
        .pipe(select(UsersSelectors.getInterestsState))
        .subscribe(value => (result = value))
        .unsubscribe();

      expect(result).toEqual({
        loading: false,
        error: false,
        success: false,
        value: emptyInterestList,
      });
    });
  });

  describe('getInterestsLoaded', () => {
    it('should return success flag of interests state', () => {
      let result: boolean;
      store
        .pipe(select(UsersSelectors.getInterestsLoaded))
        .subscribe(value => (result = value));
      expect(result).toEqual(false);

      store.dispatch(
        new UserActions.LoadProductInterestsSuccess(mockedInterestList)
      );
      expect(result).toEqual(true);
    });
  });

  describe('getInterests', () => {
    it('should return a ProductInterestList', () => {
      let result: ProductInterestList;
      store
        .pipe(select(UsersSelectors.getInterests))
        .subscribe(value => (result = value));
      expect(result).toEqual(mockedInterestList);

      store.dispatch(
        new UserActions.LoadProductInterestsSuccess(mockedInterestList)
      );
      expect(result).toEqual(mockedInterestList);
    });
  });
});

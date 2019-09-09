import { CmsComponent } from '../../../model/cms.model';
import { StateEntityLoaderActions } from '../../../state/utils/index';
import { COMPONENT_ENTITY } from '../cms-state';

export const LOAD_CMS_COMPONENT = '[Cms] Load Component';
export const LOAD_CMS_COMPONENT_FAIL = '[Cms] Load Component Fail';
export const LOAD_CMS_COMPONENT_SUCCESS = '[Cms] Load Component Success';

export const LOAD_CMS_COMPONENTS = '[Cms] Load Components';
export const LOAD_CMS_COMPONENTS_FAIL = '[Cms] Load Components Fail';
export const LOAD_CMS_COMPONENTS_SUCCESS = '[Cms] Load Components Success';

export const CMS_GET_COMPONENET_FROM_PAGE = '[Cms] Get Component from Page';

export class LoadCmsComponent extends StateEntityLoaderActions.EntityLoadAction {
  readonly type = LOAD_CMS_COMPONENT;
  constructor(public payload: string) {
    super(COMPONENT_ENTITY, payload);
  }
}

export class LoadCmsComponentFail extends StateEntityLoaderActions.EntityFailAction {
  readonly type = LOAD_CMS_COMPONENT_FAIL;
  constructor(uid: string, public payload: any) {
    super(COMPONENT_ENTITY, uid, payload);
  }
}

export class LoadCmsComponentSuccess<
  T extends CmsComponent
> extends StateEntityLoaderActions.EntitySuccessAction {
  readonly type = LOAD_CMS_COMPONENT_SUCCESS;
  constructor(public payload: T, uid?: string) {
    super(COMPONENT_ENTITY, uid || payload.uid || '');
  }
}

export class LoadCmsComponents extends StateEntityLoaderActions.EntityLoadAction {
  readonly type = LOAD_CMS_COMPONENTS;
  constructor(public payload: string[]) {
    super(COMPONENT_ENTITY, payload);
  }
}

export class LoadCmsComponentsSuccess<
  T extends CmsComponent
> extends StateEntityLoaderActions.EntitySuccessAction {
  readonly type = LOAD_CMS_COMPONENTS_SUCCESS;
  constructor(public payload: T[], uids?: string[]) {
    super(COMPONENT_ENTITY, uids);
  }
}

export class LoadCmsComponentsFail extends StateEntityLoaderActions.EntityFailAction {
  readonly type = LOAD_CMS_COMPONENTS_FAIL;
  constructor(uids: string[], public payload: any) {
    super(COMPONENT_ENTITY, uids, payload);
  }
}

export class CmsGetComponentFromPage<
  T extends CmsComponent
> extends StateEntityLoaderActions.EntitySuccessAction {
  readonly type = CMS_GET_COMPONENET_FROM_PAGE;
  constructor(public payload: T[]) {
    super(COMPONENT_ENTITY, payload.map(cmp => cmp.uid));
  }
}

// action types
export type CmsComponentAction<T extends CmsComponent> =
  | LoadCmsComponent
  | LoadCmsComponentFail
  | LoadCmsComponentSuccess<T>
  | CmsGetComponentFromPage<T>;

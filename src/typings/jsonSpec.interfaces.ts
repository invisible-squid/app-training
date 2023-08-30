interface Links {
  self: string;
  current?: string;
  next?: string;
  last?: string;
}

interface ResourceObject {
  id: string;
  type: string;
  attributes?: Record<string, unknown>;
  relationships?: Record<string, unknown>;
  links?: Links;
  included?: ResourceObject[];
}

interface ResponseStatus {
  isSuccess: boolean;
  entityId?: string;
}

interface DataError {
  error?: string;
  errors?: ErrorData[];
}


interface ErrorSource {
  pointer: string;
}

interface ErrorData {
  status: string;
  source: ErrorSource;
  title: string;
  detail: string;
  code: string;
}
interface PaginationObj {
  current: number;
  next?: number;
  prev?: number;
  first?: number;
  last?: number;
  records: number;
}

interface Meta {
  pagination: PaginationObj;
  aggregations?: Record<string, unknown>;
}

interface ResponseObj {
  data: ResourceObject | ResourceObject[];
  included?: ResourceObject[];
  meta: Meta;
  links: Links;
}

interface UpdatePayload {
  payloadObj: string;
  entityType: string;
  entityId: string;
}

interface NavigationObj {
  name: string;
  params?: {
    id?: string;
    type: string;
    action?: string;
  };
}

interface StateTransitionObj {
  event: string;
  state: string;
}

interface WindowSettings {
  appWindow: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
}

export {
  Links,
  ResourceObject,
  ResponseObj,
  ResponseStatus,
  DataError,
  ErrorData,
  Meta,
  NavigationObj,
  PaginationObj,
  StateTransitionObj,
  UpdatePayload,
  WindowSettings,
};

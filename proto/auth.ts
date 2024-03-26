import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { AuthClient as _authpackage_AuthClient, AuthDefinition as _authpackage_AuthDefinition } from './authpackage/Auth';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  authpackage: {
    Auth: SubtypeConstructor<typeof grpc.Client, _authpackage_AuthClient> & { service: _authpackage_AuthDefinition }
    AuthReq: MessageTypeDefinition
    AuthRes: MessageTypeDefinition
    RefreshReq: MessageTypeDefinition
    RefreshRes: MessageTypeDefinition
  }
}


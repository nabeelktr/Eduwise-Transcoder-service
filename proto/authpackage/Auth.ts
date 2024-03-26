// Original file: src/config/proto/auth.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AuthReq as _authpackage_AuthReq, AuthReq__Output as _authpackage_AuthReq__Output } from '../authpackage/AuthReq';
import type { AuthRes as _authpackage_AuthRes, AuthRes__Output as _authpackage_AuthRes__Output } from '../authpackage/AuthRes';
import type { RefreshReq as _authpackage_RefreshReq, RefreshReq__Output as _authpackage_RefreshReq__Output } from '../authpackage/RefreshReq';
import type { RefreshRes as _authpackage_RefreshRes, RefreshRes__Output as _authpackage_RefreshRes__Output } from '../authpackage/RefreshRes';

export interface AuthClient extends grpc.Client {
  IsAuthenticated(argument: _authpackage_AuthReq, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_authpackage_AuthRes__Output>): grpc.ClientUnaryCall;
  IsAuthenticated(argument: _authpackage_AuthReq, metadata: grpc.Metadata, callback: grpc.requestCallback<_authpackage_AuthRes__Output>): grpc.ClientUnaryCall;
  IsAuthenticated(argument: _authpackage_AuthReq, options: grpc.CallOptions, callback: grpc.requestCallback<_authpackage_AuthRes__Output>): grpc.ClientUnaryCall;
  IsAuthenticated(argument: _authpackage_AuthReq, callback: grpc.requestCallback<_authpackage_AuthRes__Output>): grpc.ClientUnaryCall;
  isAuthenticated(argument: _authpackage_AuthReq, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_authpackage_AuthRes__Output>): grpc.ClientUnaryCall;
  isAuthenticated(argument: _authpackage_AuthReq, metadata: grpc.Metadata, callback: grpc.requestCallback<_authpackage_AuthRes__Output>): grpc.ClientUnaryCall;
  isAuthenticated(argument: _authpackage_AuthReq, options: grpc.CallOptions, callback: grpc.requestCallback<_authpackage_AuthRes__Output>): grpc.ClientUnaryCall;
  isAuthenticated(argument: _authpackage_AuthReq, callback: grpc.requestCallback<_authpackage_AuthRes__Output>): grpc.ClientUnaryCall;
  
  RefreshToken(argument: _authpackage_RefreshReq, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_authpackage_RefreshRes__Output>): grpc.ClientUnaryCall;
  RefreshToken(argument: _authpackage_RefreshReq, metadata: grpc.Metadata, callback: grpc.requestCallback<_authpackage_RefreshRes__Output>): grpc.ClientUnaryCall;
  RefreshToken(argument: _authpackage_RefreshReq, options: grpc.CallOptions, callback: grpc.requestCallback<_authpackage_RefreshRes__Output>): grpc.ClientUnaryCall;
  RefreshToken(argument: _authpackage_RefreshReq, callback: grpc.requestCallback<_authpackage_RefreshRes__Output>): grpc.ClientUnaryCall;
  refreshToken(argument: _authpackage_RefreshReq, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_authpackage_RefreshRes__Output>): grpc.ClientUnaryCall;
  refreshToken(argument: _authpackage_RefreshReq, metadata: grpc.Metadata, callback: grpc.requestCallback<_authpackage_RefreshRes__Output>): grpc.ClientUnaryCall;
  refreshToken(argument: _authpackage_RefreshReq, options: grpc.CallOptions, callback: grpc.requestCallback<_authpackage_RefreshRes__Output>): grpc.ClientUnaryCall;
  refreshToken(argument: _authpackage_RefreshReq, callback: grpc.requestCallback<_authpackage_RefreshRes__Output>): grpc.ClientUnaryCall;
  
}

export interface AuthHandlers extends grpc.UntypedServiceImplementation {
  IsAuthenticated: grpc.handleUnaryCall<_authpackage_AuthReq__Output, _authpackage_AuthRes>;
  
  RefreshToken: grpc.handleUnaryCall<_authpackage_RefreshReq__Output, _authpackage_RefreshRes>;
  
}

export interface AuthDefinition extends grpc.ServiceDefinition {
  IsAuthenticated: MethodDefinition<_authpackage_AuthReq, _authpackage_AuthRes, _authpackage_AuthReq__Output, _authpackage_AuthRes__Output>
  RefreshToken: MethodDefinition<_authpackage_RefreshReq, _authpackage_RefreshRes, _authpackage_RefreshReq__Output, _authpackage_RefreshRes__Output>
}

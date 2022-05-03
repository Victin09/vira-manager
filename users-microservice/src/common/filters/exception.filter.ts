import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    catchError((error) => {
      console.log('ex', exception.getError());
      console.log('host', host.getArgs());
      return throwError(() => error);
    });
    return null;
  }
}

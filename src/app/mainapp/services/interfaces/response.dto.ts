class ResponseSuccess<T> {
    message: string = '';
    datum: T = {} as T;
    data: T[] = [];
    success: boolean = false;
    lastPage: number = 0;
    totalData: number = 0;
}

export { ResponseSuccess };

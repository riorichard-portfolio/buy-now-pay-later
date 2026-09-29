class Success<TData> {
    public readonly isSuccess: true = true
    constructor(
        public readonly data: TData
    ) { }
}

class Failed {
    public readonly isSuccess: false = false
    constructor(
        public readonly reason: string
    ) { }
}

export type TResult<TData> = Success<TData> | Failed

const nullSuccess = new Success(null)

export class ResultF {
    public static success(): Success<null> {
        return nullSuccess
    }

    public static data<TData>(resultData: TData): Success<TData> {
        return new Success(resultData)
    }

    public static failed(reason: string): Failed {
        return new Failed(reason)
    }
}
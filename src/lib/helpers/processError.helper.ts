

export const processError = (error: any | unknown): Error => {
    let err: Error = new Error('something went wrong');

    if (error instanceof Error) {
        err = error as Error
    }

    return err;
}
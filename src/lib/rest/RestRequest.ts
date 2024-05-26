const DEFAULT_TIMEOUT = 10000;

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const timeout = (promise: Promise<Response>, ms = DEFAULT_TIMEOUT): Promise<Response> => {
  const timerPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error('Timeout'));
    }, ms);
  });
  return Promise.race([timerPromise, promise]);
};

export const call = async (
  method: Method,
  path: string,
  data: any,
): Promise<any> => {
  try {
    const options = {
      method,
      body: data
        ? typeof data === 'string'
          ? data
          : JSON.stringify(data)
        : null,
    };
    const response = await timeout(fetch(path, options));
    if (!response.ok) {
      const responseText = await response.text();
      throw new Error(`${response.status} ${responseText}`);
    }
    if (response.status === 204) {
      return null;
    }
    return await response
      .clone()
      .json()
      .catch(() => response.text());
  } catch (err) {
    console.error(err);
  }
};

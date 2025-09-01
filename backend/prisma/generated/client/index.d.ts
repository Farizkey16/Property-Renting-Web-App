
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>
/**
 * Model tenants
 * 
 */
export type tenants = $Result.DefaultSelection<Prisma.$tenantsPayload>
/**
 * Model properties
 * 
 */
export type properties = $Result.DefaultSelection<Prisma.$propertiesPayload>
/**
 * Model property_images
 * 
 */
export type property_images = $Result.DefaultSelection<Prisma.$property_imagesPayload>
/**
 * Model rooms
 * 
 */
export type rooms = $Result.DefaultSelection<Prisma.$roomsPayload>
/**
 * Model room_images
 * 
 */
export type room_images = $Result.DefaultSelection<Prisma.$room_imagesPayload>
/**
 * Model room_availability
 * 
 */
export type room_availability = $Result.DefaultSelection<Prisma.$room_availabilityPayload>
/**
 * Model peak_season_rates
 * 
 */
export type peak_season_rates = $Result.DefaultSelection<Prisma.$peak_season_ratesPayload>
/**
 * Model bookings
 * 
 */
export type bookings = $Result.DefaultSelection<Prisma.$bookingsPayload>
/**
 * Model booking_rooms
 * 
 */
export type booking_rooms = $Result.DefaultSelection<Prisma.$booking_roomsPayload>
/**
 * Model reviews
 * 
 */
export type reviews = $Result.DefaultSelection<Prisma.$reviewsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  user: 'user',
  tenant: 'tenant'
};

export type Role = (typeof Role)[keyof typeof Role]


export const PriceChangeType: {
  percentage: 'percentage',
  nominal: 'nominal'
};

export type PriceChangeType = (typeof PriceChangeType)[keyof typeof PriceChangeType]


export const BookingStatus: {
  waiting_payment: 'waiting_payment',
  waiting_confirmation: 'waiting_confirmation',
  confirmed: 'confirmed',
  canceled: 'canceled',
  canceled_by_tenant: 'canceled_by_tenant',
  expired: 'expired'
};

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus]


export const PropertyCategory: {
  apartment: 'apartment',
  house: 'house',
  villa: 'villa',
  hotel: 'hotel',
  hostel: 'hostel',
  guesthouse: 'guesthouse'
};

export type PropertyCategory = (typeof PropertyCategory)[keyof typeof PropertyCategory]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type PriceChangeType = $Enums.PriceChangeType

export const PriceChangeType: typeof $Enums.PriceChangeType

export type BookingStatus = $Enums.BookingStatus

export const BookingStatus: typeof $Enums.BookingStatus

export type PropertyCategory = $Enums.PropertyCategory

export const PropertyCategory: typeof $Enums.PropertyCategory

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.users.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.users.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tenants`: Exposes CRUD operations for the **tenants** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tenants
    * const tenants = await prisma.tenants.findMany()
    * ```
    */
  get tenants(): Prisma.tenantsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.properties`: Exposes CRUD operations for the **properties** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Properties
    * const properties = await prisma.properties.findMany()
    * ```
    */
  get properties(): Prisma.propertiesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.property_images`: Exposes CRUD operations for the **property_images** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Property_images
    * const property_images = await prisma.property_images.findMany()
    * ```
    */
  get property_images(): Prisma.property_imagesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rooms`: Exposes CRUD operations for the **rooms** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rooms
    * const rooms = await prisma.rooms.findMany()
    * ```
    */
  get rooms(): Prisma.roomsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.room_images`: Exposes CRUD operations for the **room_images** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Room_images
    * const room_images = await prisma.room_images.findMany()
    * ```
    */
  get room_images(): Prisma.room_imagesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.room_availability`: Exposes CRUD operations for the **room_availability** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Room_availabilities
    * const room_availabilities = await prisma.room_availability.findMany()
    * ```
    */
  get room_availability(): Prisma.room_availabilityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.peak_season_rates`: Exposes CRUD operations for the **peak_season_rates** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Peak_season_rates
    * const peak_season_rates = await prisma.peak_season_rates.findMany()
    * ```
    */
  get peak_season_rates(): Prisma.peak_season_ratesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bookings`: Exposes CRUD operations for the **bookings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bookings
    * const bookings = await prisma.bookings.findMany()
    * ```
    */
  get bookings(): Prisma.bookingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.booking_rooms`: Exposes CRUD operations for the **booking_rooms** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Booking_rooms
    * const booking_rooms = await prisma.booking_rooms.findMany()
    * ```
    */
  get booking_rooms(): Prisma.booking_roomsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reviews`: Exposes CRUD operations for the **reviews** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.reviews.findMany()
    * ```
    */
  get reviews(): Prisma.reviewsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 361e86d0ea4987e9f53a565309b3eed797a6bcbd
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    users: 'users',
    tenants: 'tenants',
    properties: 'properties',
    property_images: 'property_images',
    rooms: 'rooms',
    room_images: 'room_images',
    room_availability: 'room_availability',
    peak_season_rates: 'peak_season_rates',
    bookings: 'bookings',
    booking_rooms: 'booking_rooms',
    reviews: 'reviews'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "users" | "tenants" | "properties" | "property_images" | "rooms" | "room_images" | "room_availability" | "peak_season_rates" | "bookings" | "booking_rooms" | "reviews"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      tenants: {
        payload: Prisma.$tenantsPayload<ExtArgs>
        fields: Prisma.tenantsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tenantsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tenantsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tenantsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tenantsPayload>
          }
          findFirst: {
            args: Prisma.tenantsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tenantsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tenantsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tenantsPayload>
          }
          findMany: {
            args: Prisma.tenantsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tenantsPayload>[]
          }
          create: {
            args: Prisma.tenantsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tenantsPayload>
          }
          createMany: {
            args: Prisma.tenantsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.tenantsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tenantsPayload>[]
          }
          delete: {
            args: Prisma.tenantsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tenantsPayload>
          }
          update: {
            args: Prisma.tenantsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tenantsPayload>
          }
          deleteMany: {
            args: Prisma.tenantsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tenantsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.tenantsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tenantsPayload>[]
          }
          upsert: {
            args: Prisma.tenantsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tenantsPayload>
          }
          aggregate: {
            args: Prisma.TenantsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTenants>
          }
          groupBy: {
            args: Prisma.tenantsGroupByArgs<ExtArgs>
            result: $Utils.Optional<TenantsGroupByOutputType>[]
          }
          count: {
            args: Prisma.tenantsCountArgs<ExtArgs>
            result: $Utils.Optional<TenantsCountAggregateOutputType> | number
          }
        }
      }
      properties: {
        payload: Prisma.$propertiesPayload<ExtArgs>
        fields: Prisma.propertiesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.propertiesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propertiesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.propertiesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propertiesPayload>
          }
          findFirst: {
            args: Prisma.propertiesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propertiesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.propertiesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propertiesPayload>
          }
          findMany: {
            args: Prisma.propertiesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propertiesPayload>[]
          }
          create: {
            args: Prisma.propertiesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propertiesPayload>
          }
          createMany: {
            args: Prisma.propertiesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.propertiesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propertiesPayload>[]
          }
          delete: {
            args: Prisma.propertiesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propertiesPayload>
          }
          update: {
            args: Prisma.propertiesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propertiesPayload>
          }
          deleteMany: {
            args: Prisma.propertiesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.propertiesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.propertiesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propertiesPayload>[]
          }
          upsert: {
            args: Prisma.propertiesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propertiesPayload>
          }
          aggregate: {
            args: Prisma.PropertiesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProperties>
          }
          groupBy: {
            args: Prisma.propertiesGroupByArgs<ExtArgs>
            result: $Utils.Optional<PropertiesGroupByOutputType>[]
          }
          count: {
            args: Prisma.propertiesCountArgs<ExtArgs>
            result: $Utils.Optional<PropertiesCountAggregateOutputType> | number
          }
        }
      }
      property_images: {
        payload: Prisma.$property_imagesPayload<ExtArgs>
        fields: Prisma.property_imagesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.property_imagesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$property_imagesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.property_imagesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$property_imagesPayload>
          }
          findFirst: {
            args: Prisma.property_imagesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$property_imagesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.property_imagesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$property_imagesPayload>
          }
          findMany: {
            args: Prisma.property_imagesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$property_imagesPayload>[]
          }
          create: {
            args: Prisma.property_imagesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$property_imagesPayload>
          }
          createMany: {
            args: Prisma.property_imagesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.property_imagesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$property_imagesPayload>[]
          }
          delete: {
            args: Prisma.property_imagesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$property_imagesPayload>
          }
          update: {
            args: Prisma.property_imagesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$property_imagesPayload>
          }
          deleteMany: {
            args: Prisma.property_imagesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.property_imagesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.property_imagesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$property_imagesPayload>[]
          }
          upsert: {
            args: Prisma.property_imagesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$property_imagesPayload>
          }
          aggregate: {
            args: Prisma.Property_imagesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProperty_images>
          }
          groupBy: {
            args: Prisma.property_imagesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Property_imagesGroupByOutputType>[]
          }
          count: {
            args: Prisma.property_imagesCountArgs<ExtArgs>
            result: $Utils.Optional<Property_imagesCountAggregateOutputType> | number
          }
        }
      }
      rooms: {
        payload: Prisma.$roomsPayload<ExtArgs>
        fields: Prisma.roomsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.roomsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$roomsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.roomsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$roomsPayload>
          }
          findFirst: {
            args: Prisma.roomsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$roomsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.roomsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$roomsPayload>
          }
          findMany: {
            args: Prisma.roomsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$roomsPayload>[]
          }
          create: {
            args: Prisma.roomsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$roomsPayload>
          }
          createMany: {
            args: Prisma.roomsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.roomsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$roomsPayload>[]
          }
          delete: {
            args: Prisma.roomsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$roomsPayload>
          }
          update: {
            args: Prisma.roomsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$roomsPayload>
          }
          deleteMany: {
            args: Prisma.roomsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.roomsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.roomsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$roomsPayload>[]
          }
          upsert: {
            args: Prisma.roomsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$roomsPayload>
          }
          aggregate: {
            args: Prisma.RoomsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRooms>
          }
          groupBy: {
            args: Prisma.roomsGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomsGroupByOutputType>[]
          }
          count: {
            args: Prisma.roomsCountArgs<ExtArgs>
            result: $Utils.Optional<RoomsCountAggregateOutputType> | number
          }
        }
      }
      room_images: {
        payload: Prisma.$room_imagesPayload<ExtArgs>
        fields: Prisma.room_imagesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.room_imagesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_imagesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.room_imagesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_imagesPayload>
          }
          findFirst: {
            args: Prisma.room_imagesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_imagesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.room_imagesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_imagesPayload>
          }
          findMany: {
            args: Prisma.room_imagesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_imagesPayload>[]
          }
          create: {
            args: Prisma.room_imagesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_imagesPayload>
          }
          createMany: {
            args: Prisma.room_imagesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.room_imagesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_imagesPayload>[]
          }
          delete: {
            args: Prisma.room_imagesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_imagesPayload>
          }
          update: {
            args: Prisma.room_imagesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_imagesPayload>
          }
          deleteMany: {
            args: Prisma.room_imagesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.room_imagesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.room_imagesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_imagesPayload>[]
          }
          upsert: {
            args: Prisma.room_imagesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_imagesPayload>
          }
          aggregate: {
            args: Prisma.Room_imagesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoom_images>
          }
          groupBy: {
            args: Prisma.room_imagesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Room_imagesGroupByOutputType>[]
          }
          count: {
            args: Prisma.room_imagesCountArgs<ExtArgs>
            result: $Utils.Optional<Room_imagesCountAggregateOutputType> | number
          }
        }
      }
      room_availability: {
        payload: Prisma.$room_availabilityPayload<ExtArgs>
        fields: Prisma.room_availabilityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.room_availabilityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_availabilityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.room_availabilityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_availabilityPayload>
          }
          findFirst: {
            args: Prisma.room_availabilityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_availabilityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.room_availabilityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_availabilityPayload>
          }
          findMany: {
            args: Prisma.room_availabilityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_availabilityPayload>[]
          }
          create: {
            args: Prisma.room_availabilityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_availabilityPayload>
          }
          createMany: {
            args: Prisma.room_availabilityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.room_availabilityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_availabilityPayload>[]
          }
          delete: {
            args: Prisma.room_availabilityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_availabilityPayload>
          }
          update: {
            args: Prisma.room_availabilityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_availabilityPayload>
          }
          deleteMany: {
            args: Prisma.room_availabilityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.room_availabilityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.room_availabilityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_availabilityPayload>[]
          }
          upsert: {
            args: Prisma.room_availabilityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_availabilityPayload>
          }
          aggregate: {
            args: Prisma.Room_availabilityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoom_availability>
          }
          groupBy: {
            args: Prisma.room_availabilityGroupByArgs<ExtArgs>
            result: $Utils.Optional<Room_availabilityGroupByOutputType>[]
          }
          count: {
            args: Prisma.room_availabilityCountArgs<ExtArgs>
            result: $Utils.Optional<Room_availabilityCountAggregateOutputType> | number
          }
        }
      }
      peak_season_rates: {
        payload: Prisma.$peak_season_ratesPayload<ExtArgs>
        fields: Prisma.peak_season_ratesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.peak_season_ratesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$peak_season_ratesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.peak_season_ratesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$peak_season_ratesPayload>
          }
          findFirst: {
            args: Prisma.peak_season_ratesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$peak_season_ratesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.peak_season_ratesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$peak_season_ratesPayload>
          }
          findMany: {
            args: Prisma.peak_season_ratesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$peak_season_ratesPayload>[]
          }
          create: {
            args: Prisma.peak_season_ratesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$peak_season_ratesPayload>
          }
          createMany: {
            args: Prisma.peak_season_ratesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.peak_season_ratesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$peak_season_ratesPayload>[]
          }
          delete: {
            args: Prisma.peak_season_ratesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$peak_season_ratesPayload>
          }
          update: {
            args: Prisma.peak_season_ratesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$peak_season_ratesPayload>
          }
          deleteMany: {
            args: Prisma.peak_season_ratesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.peak_season_ratesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.peak_season_ratesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$peak_season_ratesPayload>[]
          }
          upsert: {
            args: Prisma.peak_season_ratesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$peak_season_ratesPayload>
          }
          aggregate: {
            args: Prisma.Peak_season_ratesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePeak_season_rates>
          }
          groupBy: {
            args: Prisma.peak_season_ratesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Peak_season_ratesGroupByOutputType>[]
          }
          count: {
            args: Prisma.peak_season_ratesCountArgs<ExtArgs>
            result: $Utils.Optional<Peak_season_ratesCountAggregateOutputType> | number
          }
        }
      }
      bookings: {
        payload: Prisma.$bookingsPayload<ExtArgs>
        fields: Prisma.bookingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.bookingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.bookingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookingsPayload>
          }
          findFirst: {
            args: Prisma.bookingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.bookingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookingsPayload>
          }
          findMany: {
            args: Prisma.bookingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookingsPayload>[]
          }
          create: {
            args: Prisma.bookingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookingsPayload>
          }
          createMany: {
            args: Prisma.bookingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.bookingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookingsPayload>[]
          }
          delete: {
            args: Prisma.bookingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookingsPayload>
          }
          update: {
            args: Prisma.bookingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookingsPayload>
          }
          deleteMany: {
            args: Prisma.bookingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.bookingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.bookingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookingsPayload>[]
          }
          upsert: {
            args: Prisma.bookingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bookingsPayload>
          }
          aggregate: {
            args: Prisma.BookingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBookings>
          }
          groupBy: {
            args: Prisma.bookingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.bookingsCountArgs<ExtArgs>
            result: $Utils.Optional<BookingsCountAggregateOutputType> | number
          }
        }
      }
      booking_rooms: {
        payload: Prisma.$booking_roomsPayload<ExtArgs>
        fields: Prisma.booking_roomsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.booking_roomsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$booking_roomsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.booking_roomsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$booking_roomsPayload>
          }
          findFirst: {
            args: Prisma.booking_roomsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$booking_roomsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.booking_roomsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$booking_roomsPayload>
          }
          findMany: {
            args: Prisma.booking_roomsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$booking_roomsPayload>[]
          }
          create: {
            args: Prisma.booking_roomsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$booking_roomsPayload>
          }
          createMany: {
            args: Prisma.booking_roomsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.booking_roomsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$booking_roomsPayload>[]
          }
          delete: {
            args: Prisma.booking_roomsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$booking_roomsPayload>
          }
          update: {
            args: Prisma.booking_roomsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$booking_roomsPayload>
          }
          deleteMany: {
            args: Prisma.booking_roomsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.booking_roomsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.booking_roomsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$booking_roomsPayload>[]
          }
          upsert: {
            args: Prisma.booking_roomsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$booking_roomsPayload>
          }
          aggregate: {
            args: Prisma.Booking_roomsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBooking_rooms>
          }
          groupBy: {
            args: Prisma.booking_roomsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Booking_roomsGroupByOutputType>[]
          }
          count: {
            args: Prisma.booking_roomsCountArgs<ExtArgs>
            result: $Utils.Optional<Booking_roomsCountAggregateOutputType> | number
          }
        }
      }
      reviews: {
        payload: Prisma.$reviewsPayload<ExtArgs>
        fields: Prisma.reviewsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.reviewsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.reviewsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>
          }
          findFirst: {
            args: Prisma.reviewsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.reviewsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>
          }
          findMany: {
            args: Prisma.reviewsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>[]
          }
          create: {
            args: Prisma.reviewsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>
          }
          createMany: {
            args: Prisma.reviewsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.reviewsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>[]
          }
          delete: {
            args: Prisma.reviewsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>
          }
          update: {
            args: Prisma.reviewsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>
          }
          deleteMany: {
            args: Prisma.reviewsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.reviewsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.reviewsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>[]
          }
          upsert: {
            args: Prisma.reviewsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewsPayload>
          }
          aggregate: {
            args: Prisma.ReviewsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReviews>
          }
          groupBy: {
            args: Prisma.reviewsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewsGroupByOutputType>[]
          }
          count: {
            args: Prisma.reviewsCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    users?: usersOmit
    tenants?: tenantsOmit
    properties?: propertiesOmit
    property_images?: property_imagesOmit
    rooms?: roomsOmit
    room_images?: room_imagesOmit
    room_availability?: room_availabilityOmit
    peak_season_rates?: peak_season_ratesOmit
    bookings?: bookingsOmit
    booking_rooms?: booking_roomsOmit
    reviews?: reviewsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    bookings: number
    reviews: number
    tenants: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | UsersCountOutputTypeCountBookingsArgs
    reviews?: boolean | UsersCountOutputTypeCountReviewsArgs
    tenants?: boolean | UsersCountOutputTypeCountTenantsArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: bookingsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reviewsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountTenantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tenantsWhereInput
  }


  /**
   * Count Type TenantsCountOutputType
   */

  export type TenantsCountOutputType = {
    properties: number
  }

  export type TenantsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    properties?: boolean | TenantsCountOutputTypeCountPropertiesArgs
  }

  // Custom InputTypes
  /**
   * TenantsCountOutputType without action
   */
  export type TenantsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantsCountOutputType
     */
    select?: TenantsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TenantsCountOutputType without action
   */
  export type TenantsCountOutputTypeCountPropertiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: propertiesWhereInput
  }


  /**
   * Count Type PropertiesCountOutputType
   */

  export type PropertiesCountOutputType = {
    bookings: number
    peak_season_rates: number
    property_images: number
    reviews: number
    rooms: number
  }

  export type PropertiesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | PropertiesCountOutputTypeCountBookingsArgs
    peak_season_rates?: boolean | PropertiesCountOutputTypeCountPeak_season_ratesArgs
    property_images?: boolean | PropertiesCountOutputTypeCountProperty_imagesArgs
    reviews?: boolean | PropertiesCountOutputTypeCountReviewsArgs
    rooms?: boolean | PropertiesCountOutputTypeCountRoomsArgs
  }

  // Custom InputTypes
  /**
   * PropertiesCountOutputType without action
   */
  export type PropertiesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertiesCountOutputType
     */
    select?: PropertiesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PropertiesCountOutputType without action
   */
  export type PropertiesCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: bookingsWhereInput
  }

  /**
   * PropertiesCountOutputType without action
   */
  export type PropertiesCountOutputTypeCountPeak_season_ratesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: peak_season_ratesWhereInput
  }

  /**
   * PropertiesCountOutputType without action
   */
  export type PropertiesCountOutputTypeCountProperty_imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: property_imagesWhereInput
  }

  /**
   * PropertiesCountOutputType without action
   */
  export type PropertiesCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reviewsWhereInput
  }

  /**
   * PropertiesCountOutputType without action
   */
  export type PropertiesCountOutputTypeCountRoomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: roomsWhereInput
  }


  /**
   * Count Type RoomsCountOutputType
   */

  export type RoomsCountOutputType = {
    booking_rooms: number
    peak_season_rates: number
    room_availability: number
    room_images: number
  }

  export type RoomsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking_rooms?: boolean | RoomsCountOutputTypeCountBooking_roomsArgs
    peak_season_rates?: boolean | RoomsCountOutputTypeCountPeak_season_ratesArgs
    room_availability?: boolean | RoomsCountOutputTypeCountRoom_availabilityArgs
    room_images?: boolean | RoomsCountOutputTypeCountRoom_imagesArgs
  }

  // Custom InputTypes
  /**
   * RoomsCountOutputType without action
   */
  export type RoomsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomsCountOutputType
     */
    select?: RoomsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoomsCountOutputType without action
   */
  export type RoomsCountOutputTypeCountBooking_roomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: booking_roomsWhereInput
  }

  /**
   * RoomsCountOutputType without action
   */
  export type RoomsCountOutputTypeCountPeak_season_ratesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: peak_season_ratesWhereInput
  }

  /**
   * RoomsCountOutputType without action
   */
  export type RoomsCountOutputTypeCountRoom_availabilityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: room_availabilityWhereInput
  }

  /**
   * RoomsCountOutputType without action
   */
  export type RoomsCountOutputTypeCountRoom_imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: room_imagesWhereInput
  }


  /**
   * Count Type BookingsCountOutputType
   */

  export type BookingsCountOutputType = {
    booking_rooms: number
    reviews: number
  }

  export type BookingsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking_rooms?: boolean | BookingsCountOutputTypeCountBooking_roomsArgs
    reviews?: boolean | BookingsCountOutputTypeCountReviewsArgs
  }

  // Custom InputTypes
  /**
   * BookingsCountOutputType without action
   */
  export type BookingsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingsCountOutputType
     */
    select?: BookingsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BookingsCountOutputType without action
   */
  export type BookingsCountOutputTypeCountBooking_roomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: booking_roomsWhereInput
  }

  /**
   * BookingsCountOutputType without action
   */
  export type BookingsCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reviewsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersMinAggregateOutputType = {
    id: string | null
    role: $Enums.Role | null
    full_name: string | null
    email: string | null
    password_hash: string | null
    profile_picture: string | null
    is_verified: boolean | null
    created_at: Date | null
    updated_at: Date | null
    reset_password_otp: string | null
    verify_otp: string | null
    verify_otp_expires_at: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: string | null
    role: $Enums.Role | null
    full_name: string | null
    email: string | null
    password_hash: string | null
    profile_picture: string | null
    is_verified: boolean | null
    created_at: Date | null
    updated_at: Date | null
    reset_password_otp: string | null
    verify_otp: string | null
    verify_otp_expires_at: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    role: number
    full_name: number
    email: number
    password_hash: number
    profile_picture: number
    is_verified: number
    created_at: number
    updated_at: number
    reset_password_otp: number
    verify_otp: number
    verify_otp_expires_at: number
    _all: number
  }


  export type UsersMinAggregateInputType = {
    id?: true
    role?: true
    full_name?: true
    email?: true
    password_hash?: true
    profile_picture?: true
    is_verified?: true
    created_at?: true
    updated_at?: true
    reset_password_otp?: true
    verify_otp?: true
    verify_otp_expires_at?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    role?: true
    full_name?: true
    email?: true
    password_hash?: true
    profile_picture?: true
    is_verified?: true
    created_at?: true
    updated_at?: true
    reset_password_otp?: true
    verify_otp?: true
    verify_otp_expires_at?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    role?: true
    full_name?: true
    email?: true
    password_hash?: true
    profile_picture?: true
    is_verified?: true
    created_at?: true
    updated_at?: true
    reset_password_otp?: true
    verify_otp?: true
    verify_otp_expires_at?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: string
    role: $Enums.Role
    full_name: string
    email: string
    password_hash: string
    profile_picture: string | null
    is_verified: boolean
    created_at: Date
    updated_at: Date
    reset_password_otp: string | null
    verify_otp: string | null
    verify_otp_expires_at: Date | null
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    full_name?: boolean
    email?: boolean
    password_hash?: boolean
    profile_picture?: boolean
    is_verified?: boolean
    created_at?: boolean
    updated_at?: boolean
    reset_password_otp?: boolean
    verify_otp?: boolean
    verify_otp_expires_at?: boolean
    bookings?: boolean | users$bookingsArgs<ExtArgs>
    reviews?: boolean | users$reviewsArgs<ExtArgs>
    tenants?: boolean | users$tenantsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    full_name?: boolean
    email?: boolean
    password_hash?: boolean
    profile_picture?: boolean
    is_verified?: boolean
    created_at?: boolean
    updated_at?: boolean
    reset_password_otp?: boolean
    verify_otp?: boolean
    verify_otp_expires_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    role?: boolean
    full_name?: boolean
    email?: boolean
    password_hash?: boolean
    profile_picture?: boolean
    is_verified?: boolean
    created_at?: boolean
    updated_at?: boolean
    reset_password_otp?: boolean
    verify_otp?: boolean
    verify_otp_expires_at?: boolean
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    role?: boolean
    full_name?: boolean
    email?: boolean
    password_hash?: boolean
    profile_picture?: boolean
    is_verified?: boolean
    created_at?: boolean
    updated_at?: boolean
    reset_password_otp?: boolean
    verify_otp?: boolean
    verify_otp_expires_at?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "role" | "full_name" | "email" | "password_hash" | "profile_picture" | "is_verified" | "created_at" | "updated_at" | "reset_password_otp" | "verify_otp" | "verify_otp_expires_at", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | users$bookingsArgs<ExtArgs>
    reviews?: boolean | users$reviewsArgs<ExtArgs>
    tenants?: boolean | users$tenantsArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      bookings: Prisma.$bookingsPayload<ExtArgs>[]
      reviews: Prisma.$reviewsPayload<ExtArgs>[]
      tenants: Prisma.$tenantsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      role: $Enums.Role
      full_name: string
      email: string
      password_hash: string
      profile_picture: string | null
      is_verified: boolean
      created_at: Date
      updated_at: Date
      reset_password_otp: string | null
      verify_otp: string | null
      verify_otp_expires_at: Date | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const usersWithIdOnly = await prisma.users.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bookings<T extends users$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, users$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bookingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviews<T extends users$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, users$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tenants<T extends users$tenantsArgs<ExtArgs> = {}>(args?: Subset<T, users$tenantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tenantsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'String'>
    readonly role: FieldRef<"users", 'Role'>
    readonly full_name: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly password_hash: FieldRef<"users", 'String'>
    readonly profile_picture: FieldRef<"users", 'String'>
    readonly is_verified: FieldRef<"users", 'Boolean'>
    readonly created_at: FieldRef<"users", 'DateTime'>
    readonly updated_at: FieldRef<"users", 'DateTime'>
    readonly reset_password_otp: FieldRef<"users", 'String'>
    readonly verify_otp: FieldRef<"users", 'String'>
    readonly verify_otp_expires_at: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.bookings
   */
  export type users$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookings
     */
    select?: bookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookings
     */
    omit?: bookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookingsInclude<ExtArgs> | null
    where?: bookingsWhereInput
    orderBy?: bookingsOrderByWithRelationInput | bookingsOrderByWithRelationInput[]
    cursor?: bookingsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingsScalarFieldEnum | BookingsScalarFieldEnum[]
  }

  /**
   * users.reviews
   */
  export type users$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    where?: reviewsWhereInput
    orderBy?: reviewsOrderByWithRelationInput | reviewsOrderByWithRelationInput[]
    cursor?: reviewsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewsScalarFieldEnum | ReviewsScalarFieldEnum[]
  }

  /**
   * users.tenants
   */
  export type users$tenantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tenants
     */
    select?: tenantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tenants
     */
    omit?: tenantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tenantsInclude<ExtArgs> | null
    where?: tenantsWhereInput
    orderBy?: tenantsOrderByWithRelationInput | tenantsOrderByWithRelationInput[]
    cursor?: tenantsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TenantsScalarFieldEnum | TenantsScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Model tenants
   */

  export type AggregateTenants = {
    _count: TenantsCountAggregateOutputType | null
    _min: TenantsMinAggregateOutputType | null
    _max: TenantsMaxAggregateOutputType | null
  }

  export type TenantsMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    company_name: string | null
    address: string | null
    phone_number: string | null
    logo: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TenantsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    company_name: string | null
    address: string | null
    phone_number: string | null
    logo: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TenantsCountAggregateOutputType = {
    id: number
    user_id: number
    company_name: number
    address: number
    phone_number: number
    logo: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type TenantsMinAggregateInputType = {
    id?: true
    user_id?: true
    company_name?: true
    address?: true
    phone_number?: true
    logo?: true
    created_at?: true
    updated_at?: true
  }

  export type TenantsMaxAggregateInputType = {
    id?: true
    user_id?: true
    company_name?: true
    address?: true
    phone_number?: true
    logo?: true
    created_at?: true
    updated_at?: true
  }

  export type TenantsCountAggregateInputType = {
    id?: true
    user_id?: true
    company_name?: true
    address?: true
    phone_number?: true
    logo?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type TenantsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tenants to aggregate.
     */
    where?: tenantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tenants to fetch.
     */
    orderBy?: tenantsOrderByWithRelationInput | tenantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tenantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tenants
    **/
    _count?: true | TenantsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenantsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenantsMaxAggregateInputType
  }

  export type GetTenantsAggregateType<T extends TenantsAggregateArgs> = {
        [P in keyof T & keyof AggregateTenants]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenants[P]>
      : GetScalarType<T[P], AggregateTenants[P]>
  }




  export type tenantsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tenantsWhereInput
    orderBy?: tenantsOrderByWithAggregationInput | tenantsOrderByWithAggregationInput[]
    by: TenantsScalarFieldEnum[] | TenantsScalarFieldEnum
    having?: tenantsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenantsCountAggregateInputType | true
    _min?: TenantsMinAggregateInputType
    _max?: TenantsMaxAggregateInputType
  }

  export type TenantsGroupByOutputType = {
    id: string
    user_id: string
    company_name: string
    address: string
    phone_number: string
    logo: string | null
    created_at: Date
    updated_at: Date
    _count: TenantsCountAggregateOutputType | null
    _min: TenantsMinAggregateOutputType | null
    _max: TenantsMaxAggregateOutputType | null
  }

  type GetTenantsGroupByPayload<T extends tenantsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenantsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenantsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenantsGroupByOutputType[P]>
            : GetScalarType<T[P], TenantsGroupByOutputType[P]>
        }
      >
    >


  export type tenantsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    company_name?: boolean
    address?: boolean
    phone_number?: boolean
    logo?: boolean
    created_at?: boolean
    updated_at?: boolean
    properties?: boolean | tenants$propertiesArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
    _count?: boolean | TenantsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenants"]>

  export type tenantsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    company_name?: boolean
    address?: boolean
    phone_number?: boolean
    logo?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenants"]>

  export type tenantsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    company_name?: boolean
    address?: boolean
    phone_number?: boolean
    logo?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenants"]>

  export type tenantsSelectScalar = {
    id?: boolean
    user_id?: boolean
    company_name?: boolean
    address?: boolean
    phone_number?: boolean
    logo?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type tenantsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "company_name" | "address" | "phone_number" | "logo" | "created_at" | "updated_at", ExtArgs["result"]["tenants"]>
  export type tenantsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    properties?: boolean | tenants$propertiesArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
    _count?: boolean | TenantsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type tenantsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type tenantsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $tenantsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tenants"
    objects: {
      properties: Prisma.$propertiesPayload<ExtArgs>[]
      user: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      company_name: string
      address: string
      phone_number: string
      logo: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["tenants"]>
    composites: {}
  }

  type tenantsGetPayload<S extends boolean | null | undefined | tenantsDefaultArgs> = $Result.GetResult<Prisma.$tenantsPayload, S>

  type tenantsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tenantsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TenantsCountAggregateInputType | true
    }

  export interface tenantsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tenants'], meta: { name: 'tenants' } }
    /**
     * Find zero or one Tenants that matches the filter.
     * @param {tenantsFindUniqueArgs} args - Arguments to find a Tenants
     * @example
     * // Get one Tenants
     * const tenants = await prisma.tenants.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tenantsFindUniqueArgs>(args: SelectSubset<T, tenantsFindUniqueArgs<ExtArgs>>): Prisma__tenantsClient<$Result.GetResult<Prisma.$tenantsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tenants that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tenantsFindUniqueOrThrowArgs} args - Arguments to find a Tenants
     * @example
     * // Get one Tenants
     * const tenants = await prisma.tenants.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tenantsFindUniqueOrThrowArgs>(args: SelectSubset<T, tenantsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tenantsClient<$Result.GetResult<Prisma.$tenantsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tenants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tenantsFindFirstArgs} args - Arguments to find a Tenants
     * @example
     * // Get one Tenants
     * const tenants = await prisma.tenants.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tenantsFindFirstArgs>(args?: SelectSubset<T, tenantsFindFirstArgs<ExtArgs>>): Prisma__tenantsClient<$Result.GetResult<Prisma.$tenantsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tenants that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tenantsFindFirstOrThrowArgs} args - Arguments to find a Tenants
     * @example
     * // Get one Tenants
     * const tenants = await prisma.tenants.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tenantsFindFirstOrThrowArgs>(args?: SelectSubset<T, tenantsFindFirstOrThrowArgs<ExtArgs>>): Prisma__tenantsClient<$Result.GetResult<Prisma.$tenantsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tenants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tenantsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tenants
     * const tenants = await prisma.tenants.findMany()
     * 
     * // Get first 10 Tenants
     * const tenants = await prisma.tenants.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenantsWithIdOnly = await prisma.tenants.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends tenantsFindManyArgs>(args?: SelectSubset<T, tenantsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tenantsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tenants.
     * @param {tenantsCreateArgs} args - Arguments to create a Tenants.
     * @example
     * // Create one Tenants
     * const Tenants = await prisma.tenants.create({
     *   data: {
     *     // ... data to create a Tenants
     *   }
     * })
     * 
     */
    create<T extends tenantsCreateArgs>(args: SelectSubset<T, tenantsCreateArgs<ExtArgs>>): Prisma__tenantsClient<$Result.GetResult<Prisma.$tenantsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tenants.
     * @param {tenantsCreateManyArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenants = await prisma.tenants.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tenantsCreateManyArgs>(args?: SelectSubset<T, tenantsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tenants and returns the data saved in the database.
     * @param {tenantsCreateManyAndReturnArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenants = await prisma.tenants.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tenants and only return the `id`
     * const tenantsWithIdOnly = await prisma.tenants.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends tenantsCreateManyAndReturnArgs>(args?: SelectSubset<T, tenantsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tenantsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tenants.
     * @param {tenantsDeleteArgs} args - Arguments to delete one Tenants.
     * @example
     * // Delete one Tenants
     * const Tenants = await prisma.tenants.delete({
     *   where: {
     *     // ... filter to delete one Tenants
     *   }
     * })
     * 
     */
    delete<T extends tenantsDeleteArgs>(args: SelectSubset<T, tenantsDeleteArgs<ExtArgs>>): Prisma__tenantsClient<$Result.GetResult<Prisma.$tenantsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tenants.
     * @param {tenantsUpdateArgs} args - Arguments to update one Tenants.
     * @example
     * // Update one Tenants
     * const tenants = await prisma.tenants.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tenantsUpdateArgs>(args: SelectSubset<T, tenantsUpdateArgs<ExtArgs>>): Prisma__tenantsClient<$Result.GetResult<Prisma.$tenantsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tenants.
     * @param {tenantsDeleteManyArgs} args - Arguments to filter Tenants to delete.
     * @example
     * // Delete a few Tenants
     * const { count } = await prisma.tenants.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tenantsDeleteManyArgs>(args?: SelectSubset<T, tenantsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tenantsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tenants
     * const tenants = await prisma.tenants.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tenantsUpdateManyArgs>(args: SelectSubset<T, tenantsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenants and returns the data updated in the database.
     * @param {tenantsUpdateManyAndReturnArgs} args - Arguments to update many Tenants.
     * @example
     * // Update many Tenants
     * const tenants = await prisma.tenants.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tenants and only return the `id`
     * const tenantsWithIdOnly = await prisma.tenants.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends tenantsUpdateManyAndReturnArgs>(args: SelectSubset<T, tenantsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tenantsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tenants.
     * @param {tenantsUpsertArgs} args - Arguments to update or create a Tenants.
     * @example
     * // Update or create a Tenants
     * const tenants = await prisma.tenants.upsert({
     *   create: {
     *     // ... data to create a Tenants
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tenants we want to update
     *   }
     * })
     */
    upsert<T extends tenantsUpsertArgs>(args: SelectSubset<T, tenantsUpsertArgs<ExtArgs>>): Prisma__tenantsClient<$Result.GetResult<Prisma.$tenantsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tenantsCountArgs} args - Arguments to filter Tenants to count.
     * @example
     * // Count the number of Tenants
     * const count = await prisma.tenants.count({
     *   where: {
     *     // ... the filter for the Tenants we want to count
     *   }
     * })
    **/
    count<T extends tenantsCountArgs>(
      args?: Subset<T, tenantsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TenantsAggregateArgs>(args: Subset<T, TenantsAggregateArgs>): Prisma.PrismaPromise<GetTenantsAggregateType<T>>

    /**
     * Group by Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tenantsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends tenantsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tenantsGroupByArgs['orderBy'] }
        : { orderBy?: tenantsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, tenantsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tenants model
   */
  readonly fields: tenantsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tenants.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tenantsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    properties<T extends tenants$propertiesArgs<ExtArgs> = {}>(args?: Subset<T, tenants$propertiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$propertiesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the tenants model
   */
  interface tenantsFieldRefs {
    readonly id: FieldRef<"tenants", 'String'>
    readonly user_id: FieldRef<"tenants", 'String'>
    readonly company_name: FieldRef<"tenants", 'String'>
    readonly address: FieldRef<"tenants", 'String'>
    readonly phone_number: FieldRef<"tenants", 'String'>
    readonly logo: FieldRef<"tenants", 'String'>
    readonly created_at: FieldRef<"tenants", 'DateTime'>
    readonly updated_at: FieldRef<"tenants", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * tenants findUnique
   */
  export type tenantsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tenants
     */
    select?: tenantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tenants
     */
    omit?: tenantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tenantsInclude<ExtArgs> | null
    /**
     * Filter, which tenants to fetch.
     */
    where: tenantsWhereUniqueInput
  }

  /**
   * tenants findUniqueOrThrow
   */
  export type tenantsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tenants
     */
    select?: tenantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tenants
     */
    omit?: tenantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tenantsInclude<ExtArgs> | null
    /**
     * Filter, which tenants to fetch.
     */
    where: tenantsWhereUniqueInput
  }

  /**
   * tenants findFirst
   */
  export type tenantsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tenants
     */
    select?: tenantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tenants
     */
    omit?: tenantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tenantsInclude<ExtArgs> | null
    /**
     * Filter, which tenants to fetch.
     */
    where?: tenantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tenants to fetch.
     */
    orderBy?: tenantsOrderByWithRelationInput | tenantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tenants.
     */
    cursor?: tenantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tenants.
     */
    distinct?: TenantsScalarFieldEnum | TenantsScalarFieldEnum[]
  }

  /**
   * tenants findFirstOrThrow
   */
  export type tenantsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tenants
     */
    select?: tenantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tenants
     */
    omit?: tenantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tenantsInclude<ExtArgs> | null
    /**
     * Filter, which tenants to fetch.
     */
    where?: tenantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tenants to fetch.
     */
    orderBy?: tenantsOrderByWithRelationInput | tenantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tenants.
     */
    cursor?: tenantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tenants.
     */
    distinct?: TenantsScalarFieldEnum | TenantsScalarFieldEnum[]
  }

  /**
   * tenants findMany
   */
  export type tenantsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tenants
     */
    select?: tenantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tenants
     */
    omit?: tenantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tenantsInclude<ExtArgs> | null
    /**
     * Filter, which tenants to fetch.
     */
    where?: tenantsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tenants to fetch.
     */
    orderBy?: tenantsOrderByWithRelationInput | tenantsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tenants.
     */
    cursor?: tenantsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tenants.
     */
    skip?: number
    distinct?: TenantsScalarFieldEnum | TenantsScalarFieldEnum[]
  }

  /**
   * tenants create
   */
  export type tenantsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tenants
     */
    select?: tenantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tenants
     */
    omit?: tenantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tenantsInclude<ExtArgs> | null
    /**
     * The data needed to create a tenants.
     */
    data: XOR<tenantsCreateInput, tenantsUncheckedCreateInput>
  }

  /**
   * tenants createMany
   */
  export type tenantsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tenants.
     */
    data: tenantsCreateManyInput | tenantsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * tenants createManyAndReturn
   */
  export type tenantsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tenants
     */
    select?: tenantsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tenants
     */
    omit?: tenantsOmit<ExtArgs> | null
    /**
     * The data used to create many tenants.
     */
    data: tenantsCreateManyInput | tenantsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tenantsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * tenants update
   */
  export type tenantsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tenants
     */
    select?: tenantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tenants
     */
    omit?: tenantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tenantsInclude<ExtArgs> | null
    /**
     * The data needed to update a tenants.
     */
    data: XOR<tenantsUpdateInput, tenantsUncheckedUpdateInput>
    /**
     * Choose, which tenants to update.
     */
    where: tenantsWhereUniqueInput
  }

  /**
   * tenants updateMany
   */
  export type tenantsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tenants.
     */
    data: XOR<tenantsUpdateManyMutationInput, tenantsUncheckedUpdateManyInput>
    /**
     * Filter which tenants to update
     */
    where?: tenantsWhereInput
    /**
     * Limit how many tenants to update.
     */
    limit?: number
  }

  /**
   * tenants updateManyAndReturn
   */
  export type tenantsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tenants
     */
    select?: tenantsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tenants
     */
    omit?: tenantsOmit<ExtArgs> | null
    /**
     * The data used to update tenants.
     */
    data: XOR<tenantsUpdateManyMutationInput, tenantsUncheckedUpdateManyInput>
    /**
     * Filter which tenants to update
     */
    where?: tenantsWhereInput
    /**
     * Limit how many tenants to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tenantsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * tenants upsert
   */
  export type tenantsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tenants
     */
    select?: tenantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tenants
     */
    omit?: tenantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tenantsInclude<ExtArgs> | null
    /**
     * The filter to search for the tenants to update in case it exists.
     */
    where: tenantsWhereUniqueInput
    /**
     * In case the tenants found by the `where` argument doesn't exist, create a new tenants with this data.
     */
    create: XOR<tenantsCreateInput, tenantsUncheckedCreateInput>
    /**
     * In case the tenants was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tenantsUpdateInput, tenantsUncheckedUpdateInput>
  }

  /**
   * tenants delete
   */
  export type tenantsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tenants
     */
    select?: tenantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tenants
     */
    omit?: tenantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tenantsInclude<ExtArgs> | null
    /**
     * Filter which tenants to delete.
     */
    where: tenantsWhereUniqueInput
  }

  /**
   * tenants deleteMany
   */
  export type tenantsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tenants to delete
     */
    where?: tenantsWhereInput
    /**
     * Limit how many tenants to delete.
     */
    limit?: number
  }

  /**
   * tenants.properties
   */
  export type tenants$propertiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the properties
     */
    select?: propertiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the properties
     */
    omit?: propertiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: propertiesInclude<ExtArgs> | null
    where?: propertiesWhereInput
    orderBy?: propertiesOrderByWithRelationInput | propertiesOrderByWithRelationInput[]
    cursor?: propertiesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PropertiesScalarFieldEnum | PropertiesScalarFieldEnum[]
  }

  /**
   * tenants without action
   */
  export type tenantsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tenants
     */
    select?: tenantsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tenants
     */
    omit?: tenantsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tenantsInclude<ExtArgs> | null
  }


  /**
   * Model properties
   */

  export type AggregateProperties = {
    _count: PropertiesCountAggregateOutputType | null
    _avg: PropertiesAvgAggregateOutputType | null
    _sum: PropertiesSumAggregateOutputType | null
    _min: PropertiesMinAggregateOutputType | null
    _max: PropertiesMaxAggregateOutputType | null
  }

  export type PropertiesAvgAggregateOutputType = {
    latitude: Decimal | null
    longitude: Decimal | null
  }

  export type PropertiesSumAggregateOutputType = {
    latitude: Decimal | null
    longitude: Decimal | null
  }

  export type PropertiesMinAggregateOutputType = {
    id: string | null
    tenant_id: string | null
    name: string | null
    description: string | null
    address: string | null
    city: string | null
    province: string | null
    zip_code: string | null
    latitude: Decimal | null
    longitude: Decimal | null
    main_image: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
    property_category: $Enums.PropertyCategory | null
  }

  export type PropertiesMaxAggregateOutputType = {
    id: string | null
    tenant_id: string | null
    name: string | null
    description: string | null
    address: string | null
    city: string | null
    province: string | null
    zip_code: string | null
    latitude: Decimal | null
    longitude: Decimal | null
    main_image: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
    property_category: $Enums.PropertyCategory | null
  }

  export type PropertiesCountAggregateOutputType = {
    id: number
    tenant_id: number
    name: number
    description: number
    address: number
    city: number
    province: number
    zip_code: number
    latitude: number
    longitude: number
    main_image: number
    created_at: number
    updated_at: number
    deleted_at: number
    property_category: number
    _all: number
  }


  export type PropertiesAvgAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type PropertiesSumAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type PropertiesMinAggregateInputType = {
    id?: true
    tenant_id?: true
    name?: true
    description?: true
    address?: true
    city?: true
    province?: true
    zip_code?: true
    latitude?: true
    longitude?: true
    main_image?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    property_category?: true
  }

  export type PropertiesMaxAggregateInputType = {
    id?: true
    tenant_id?: true
    name?: true
    description?: true
    address?: true
    city?: true
    province?: true
    zip_code?: true
    latitude?: true
    longitude?: true
    main_image?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    property_category?: true
  }

  export type PropertiesCountAggregateInputType = {
    id?: true
    tenant_id?: true
    name?: true
    description?: true
    address?: true
    city?: true
    province?: true
    zip_code?: true
    latitude?: true
    longitude?: true
    main_image?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    property_category?: true
    _all?: true
  }

  export type PropertiesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which properties to aggregate.
     */
    where?: propertiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of properties to fetch.
     */
    orderBy?: propertiesOrderByWithRelationInput | propertiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: propertiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned properties
    **/
    _count?: true | PropertiesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PropertiesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PropertiesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PropertiesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PropertiesMaxAggregateInputType
  }

  export type GetPropertiesAggregateType<T extends PropertiesAggregateArgs> = {
        [P in keyof T & keyof AggregateProperties]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProperties[P]>
      : GetScalarType<T[P], AggregateProperties[P]>
  }




  export type propertiesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: propertiesWhereInput
    orderBy?: propertiesOrderByWithAggregationInput | propertiesOrderByWithAggregationInput[]
    by: PropertiesScalarFieldEnum[] | PropertiesScalarFieldEnum
    having?: propertiesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PropertiesCountAggregateInputType | true
    _avg?: PropertiesAvgAggregateInputType
    _sum?: PropertiesSumAggregateInputType
    _min?: PropertiesMinAggregateInputType
    _max?: PropertiesMaxAggregateInputType
  }

  export type PropertiesGroupByOutputType = {
    id: string
    tenant_id: string
    name: string
    description: string | null
    address: string
    city: string
    province: string
    zip_code: string
    latitude: Decimal
    longitude: Decimal
    main_image: string | null
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    property_category: $Enums.PropertyCategory
    _count: PropertiesCountAggregateOutputType | null
    _avg: PropertiesAvgAggregateOutputType | null
    _sum: PropertiesSumAggregateOutputType | null
    _min: PropertiesMinAggregateOutputType | null
    _max: PropertiesMaxAggregateOutputType | null
  }

  type GetPropertiesGroupByPayload<T extends propertiesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PropertiesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PropertiesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PropertiesGroupByOutputType[P]>
            : GetScalarType<T[P], PropertiesGroupByOutputType[P]>
        }
      >
    >


  export type propertiesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    name?: boolean
    description?: boolean
    address?: boolean
    city?: boolean
    province?: boolean
    zip_code?: boolean
    latitude?: boolean
    longitude?: boolean
    main_image?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    property_category?: boolean
    bookings?: boolean | properties$bookingsArgs<ExtArgs>
    peak_season_rates?: boolean | properties$peak_season_ratesArgs<ExtArgs>
    tenant?: boolean | tenantsDefaultArgs<ExtArgs>
    property_images?: boolean | properties$property_imagesArgs<ExtArgs>
    reviews?: boolean | properties$reviewsArgs<ExtArgs>
    rooms?: boolean | properties$roomsArgs<ExtArgs>
    _count?: boolean | PropertiesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["properties"]>

  export type propertiesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    name?: boolean
    description?: boolean
    address?: boolean
    city?: boolean
    province?: boolean
    zip_code?: boolean
    latitude?: boolean
    longitude?: boolean
    main_image?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    property_category?: boolean
    tenant?: boolean | tenantsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["properties"]>

  export type propertiesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tenant_id?: boolean
    name?: boolean
    description?: boolean
    address?: boolean
    city?: boolean
    province?: boolean
    zip_code?: boolean
    latitude?: boolean
    longitude?: boolean
    main_image?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    property_category?: boolean
    tenant?: boolean | tenantsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["properties"]>

  export type propertiesSelectScalar = {
    id?: boolean
    tenant_id?: boolean
    name?: boolean
    description?: boolean
    address?: boolean
    city?: boolean
    province?: boolean
    zip_code?: boolean
    latitude?: boolean
    longitude?: boolean
    main_image?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    property_category?: boolean
  }

  export type propertiesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tenant_id" | "name" | "description" | "address" | "city" | "province" | "zip_code" | "latitude" | "longitude" | "main_image" | "created_at" | "updated_at" | "deleted_at" | "property_category", ExtArgs["result"]["properties"]>
  export type propertiesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | properties$bookingsArgs<ExtArgs>
    peak_season_rates?: boolean | properties$peak_season_ratesArgs<ExtArgs>
    tenant?: boolean | tenantsDefaultArgs<ExtArgs>
    property_images?: boolean | properties$property_imagesArgs<ExtArgs>
    reviews?: boolean | properties$reviewsArgs<ExtArgs>
    rooms?: boolean | properties$roomsArgs<ExtArgs>
    _count?: boolean | PropertiesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type propertiesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | tenantsDefaultArgs<ExtArgs>
  }
  export type propertiesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | tenantsDefaultArgs<ExtArgs>
  }

  export type $propertiesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "properties"
    objects: {
      bookings: Prisma.$bookingsPayload<ExtArgs>[]
      peak_season_rates: Prisma.$peak_season_ratesPayload<ExtArgs>[]
      tenant: Prisma.$tenantsPayload<ExtArgs>
      property_images: Prisma.$property_imagesPayload<ExtArgs>[]
      reviews: Prisma.$reviewsPayload<ExtArgs>[]
      rooms: Prisma.$roomsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tenant_id: string
      name: string
      description: string | null
      address: string
      city: string
      province: string
      zip_code: string
      latitude: Prisma.Decimal
      longitude: Prisma.Decimal
      main_image: string | null
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
      property_category: $Enums.PropertyCategory
    }, ExtArgs["result"]["properties"]>
    composites: {}
  }

  type propertiesGetPayload<S extends boolean | null | undefined | propertiesDefaultArgs> = $Result.GetResult<Prisma.$propertiesPayload, S>

  type propertiesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<propertiesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PropertiesCountAggregateInputType | true
    }

  export interface propertiesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['properties'], meta: { name: 'properties' } }
    /**
     * Find zero or one Properties that matches the filter.
     * @param {propertiesFindUniqueArgs} args - Arguments to find a Properties
     * @example
     * // Get one Properties
     * const properties = await prisma.properties.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends propertiesFindUniqueArgs>(args: SelectSubset<T, propertiesFindUniqueArgs<ExtArgs>>): Prisma__propertiesClient<$Result.GetResult<Prisma.$propertiesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Properties that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {propertiesFindUniqueOrThrowArgs} args - Arguments to find a Properties
     * @example
     * // Get one Properties
     * const properties = await prisma.properties.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends propertiesFindUniqueOrThrowArgs>(args: SelectSubset<T, propertiesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__propertiesClient<$Result.GetResult<Prisma.$propertiesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Properties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {propertiesFindFirstArgs} args - Arguments to find a Properties
     * @example
     * // Get one Properties
     * const properties = await prisma.properties.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends propertiesFindFirstArgs>(args?: SelectSubset<T, propertiesFindFirstArgs<ExtArgs>>): Prisma__propertiesClient<$Result.GetResult<Prisma.$propertiesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Properties that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {propertiesFindFirstOrThrowArgs} args - Arguments to find a Properties
     * @example
     * // Get one Properties
     * const properties = await prisma.properties.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends propertiesFindFirstOrThrowArgs>(args?: SelectSubset<T, propertiesFindFirstOrThrowArgs<ExtArgs>>): Prisma__propertiesClient<$Result.GetResult<Prisma.$propertiesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Properties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {propertiesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Properties
     * const properties = await prisma.properties.findMany()
     * 
     * // Get first 10 Properties
     * const properties = await prisma.properties.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const propertiesWithIdOnly = await prisma.properties.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends propertiesFindManyArgs>(args?: SelectSubset<T, propertiesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$propertiesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Properties.
     * @param {propertiesCreateArgs} args - Arguments to create a Properties.
     * @example
     * // Create one Properties
     * const Properties = await prisma.properties.create({
     *   data: {
     *     // ... data to create a Properties
     *   }
     * })
     * 
     */
    create<T extends propertiesCreateArgs>(args: SelectSubset<T, propertiesCreateArgs<ExtArgs>>): Prisma__propertiesClient<$Result.GetResult<Prisma.$propertiesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Properties.
     * @param {propertiesCreateManyArgs} args - Arguments to create many Properties.
     * @example
     * // Create many Properties
     * const properties = await prisma.properties.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends propertiesCreateManyArgs>(args?: SelectSubset<T, propertiesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Properties and returns the data saved in the database.
     * @param {propertiesCreateManyAndReturnArgs} args - Arguments to create many Properties.
     * @example
     * // Create many Properties
     * const properties = await prisma.properties.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Properties and only return the `id`
     * const propertiesWithIdOnly = await prisma.properties.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends propertiesCreateManyAndReturnArgs>(args?: SelectSubset<T, propertiesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$propertiesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Properties.
     * @param {propertiesDeleteArgs} args - Arguments to delete one Properties.
     * @example
     * // Delete one Properties
     * const Properties = await prisma.properties.delete({
     *   where: {
     *     // ... filter to delete one Properties
     *   }
     * })
     * 
     */
    delete<T extends propertiesDeleteArgs>(args: SelectSubset<T, propertiesDeleteArgs<ExtArgs>>): Prisma__propertiesClient<$Result.GetResult<Prisma.$propertiesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Properties.
     * @param {propertiesUpdateArgs} args - Arguments to update one Properties.
     * @example
     * // Update one Properties
     * const properties = await prisma.properties.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends propertiesUpdateArgs>(args: SelectSubset<T, propertiesUpdateArgs<ExtArgs>>): Prisma__propertiesClient<$Result.GetResult<Prisma.$propertiesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Properties.
     * @param {propertiesDeleteManyArgs} args - Arguments to filter Properties to delete.
     * @example
     * // Delete a few Properties
     * const { count } = await prisma.properties.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends propertiesDeleteManyArgs>(args?: SelectSubset<T, propertiesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Properties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {propertiesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Properties
     * const properties = await prisma.properties.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends propertiesUpdateManyArgs>(args: SelectSubset<T, propertiesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Properties and returns the data updated in the database.
     * @param {propertiesUpdateManyAndReturnArgs} args - Arguments to update many Properties.
     * @example
     * // Update many Properties
     * const properties = await prisma.properties.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Properties and only return the `id`
     * const propertiesWithIdOnly = await prisma.properties.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends propertiesUpdateManyAndReturnArgs>(args: SelectSubset<T, propertiesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$propertiesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Properties.
     * @param {propertiesUpsertArgs} args - Arguments to update or create a Properties.
     * @example
     * // Update or create a Properties
     * const properties = await prisma.properties.upsert({
     *   create: {
     *     // ... data to create a Properties
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Properties we want to update
     *   }
     * })
     */
    upsert<T extends propertiesUpsertArgs>(args: SelectSubset<T, propertiesUpsertArgs<ExtArgs>>): Prisma__propertiesClient<$Result.GetResult<Prisma.$propertiesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Properties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {propertiesCountArgs} args - Arguments to filter Properties to count.
     * @example
     * // Count the number of Properties
     * const count = await prisma.properties.count({
     *   where: {
     *     // ... the filter for the Properties we want to count
     *   }
     * })
    **/
    count<T extends propertiesCountArgs>(
      args?: Subset<T, propertiesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PropertiesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Properties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertiesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PropertiesAggregateArgs>(args: Subset<T, PropertiesAggregateArgs>): Prisma.PrismaPromise<GetPropertiesAggregateType<T>>

    /**
     * Group by Properties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {propertiesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends propertiesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: propertiesGroupByArgs['orderBy'] }
        : { orderBy?: propertiesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, propertiesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPropertiesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the properties model
   */
  readonly fields: propertiesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for properties.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__propertiesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bookings<T extends properties$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, properties$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bookingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    peak_season_rates<T extends properties$peak_season_ratesArgs<ExtArgs> = {}>(args?: Subset<T, properties$peak_season_ratesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$peak_season_ratesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tenant<T extends tenantsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, tenantsDefaultArgs<ExtArgs>>): Prisma__tenantsClient<$Result.GetResult<Prisma.$tenantsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    property_images<T extends properties$property_imagesArgs<ExtArgs> = {}>(args?: Subset<T, properties$property_imagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$property_imagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviews<T extends properties$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, properties$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rooms<T extends properties$roomsArgs<ExtArgs> = {}>(args?: Subset<T, properties$roomsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$roomsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the properties model
   */
  interface propertiesFieldRefs {
    readonly id: FieldRef<"properties", 'String'>
    readonly tenant_id: FieldRef<"properties", 'String'>
    readonly name: FieldRef<"properties", 'String'>
    readonly description: FieldRef<"properties", 'String'>
    readonly address: FieldRef<"properties", 'String'>
    readonly city: FieldRef<"properties", 'String'>
    readonly province: FieldRef<"properties", 'String'>
    readonly zip_code: FieldRef<"properties", 'String'>
    readonly latitude: FieldRef<"properties", 'Decimal'>
    readonly longitude: FieldRef<"properties", 'Decimal'>
    readonly main_image: FieldRef<"properties", 'String'>
    readonly created_at: FieldRef<"properties", 'DateTime'>
    readonly updated_at: FieldRef<"properties", 'DateTime'>
    readonly deleted_at: FieldRef<"properties", 'DateTime'>
    readonly property_category: FieldRef<"properties", 'PropertyCategory'>
  }
    

  // Custom InputTypes
  /**
   * properties findUnique
   */
  export type propertiesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the properties
     */
    select?: propertiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the properties
     */
    omit?: propertiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: propertiesInclude<ExtArgs> | null
    /**
     * Filter, which properties to fetch.
     */
    where: propertiesWhereUniqueInput
  }

  /**
   * properties findUniqueOrThrow
   */
  export type propertiesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the properties
     */
    select?: propertiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the properties
     */
    omit?: propertiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: propertiesInclude<ExtArgs> | null
    /**
     * Filter, which properties to fetch.
     */
    where: propertiesWhereUniqueInput
  }

  /**
   * properties findFirst
   */
  export type propertiesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the properties
     */
    select?: propertiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the properties
     */
    omit?: propertiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: propertiesInclude<ExtArgs> | null
    /**
     * Filter, which properties to fetch.
     */
    where?: propertiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of properties to fetch.
     */
    orderBy?: propertiesOrderByWithRelationInput | propertiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for properties.
     */
    cursor?: propertiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of properties.
     */
    distinct?: PropertiesScalarFieldEnum | PropertiesScalarFieldEnum[]
  }

  /**
   * properties findFirstOrThrow
   */
  export type propertiesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the properties
     */
    select?: propertiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the properties
     */
    omit?: propertiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: propertiesInclude<ExtArgs> | null
    /**
     * Filter, which properties to fetch.
     */
    where?: propertiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of properties to fetch.
     */
    orderBy?: propertiesOrderByWithRelationInput | propertiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for properties.
     */
    cursor?: propertiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of properties.
     */
    distinct?: PropertiesScalarFieldEnum | PropertiesScalarFieldEnum[]
  }

  /**
   * properties findMany
   */
  export type propertiesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the properties
     */
    select?: propertiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the properties
     */
    omit?: propertiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: propertiesInclude<ExtArgs> | null
    /**
     * Filter, which properties to fetch.
     */
    where?: propertiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of properties to fetch.
     */
    orderBy?: propertiesOrderByWithRelationInput | propertiesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing properties.
     */
    cursor?: propertiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` properties.
     */
    skip?: number
    distinct?: PropertiesScalarFieldEnum | PropertiesScalarFieldEnum[]
  }

  /**
   * properties create
   */
  export type propertiesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the properties
     */
    select?: propertiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the properties
     */
    omit?: propertiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: propertiesInclude<ExtArgs> | null
    /**
     * The data needed to create a properties.
     */
    data: XOR<propertiesCreateInput, propertiesUncheckedCreateInput>
  }

  /**
   * properties createMany
   */
  export type propertiesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many properties.
     */
    data: propertiesCreateManyInput | propertiesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * properties createManyAndReturn
   */
  export type propertiesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the properties
     */
    select?: propertiesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the properties
     */
    omit?: propertiesOmit<ExtArgs> | null
    /**
     * The data used to create many properties.
     */
    data: propertiesCreateManyInput | propertiesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: propertiesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * properties update
   */
  export type propertiesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the properties
     */
    select?: propertiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the properties
     */
    omit?: propertiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: propertiesInclude<ExtArgs> | null
    /**
     * The data needed to update a properties.
     */
    data: XOR<propertiesUpdateInput, propertiesUncheckedUpdateInput>
    /**
     * Choose, which properties to update.
     */
    where: propertiesWhereUniqueInput
  }

  /**
   * properties updateMany
   */
  export type propertiesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update properties.
     */
    data: XOR<propertiesUpdateManyMutationInput, propertiesUncheckedUpdateManyInput>
    /**
     * Filter which properties to update
     */
    where?: propertiesWhereInput
    /**
     * Limit how many properties to update.
     */
    limit?: number
  }

  /**
   * properties updateManyAndReturn
   */
  export type propertiesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the properties
     */
    select?: propertiesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the properties
     */
    omit?: propertiesOmit<ExtArgs> | null
    /**
     * The data used to update properties.
     */
    data: XOR<propertiesUpdateManyMutationInput, propertiesUncheckedUpdateManyInput>
    /**
     * Filter which properties to update
     */
    where?: propertiesWhereInput
    /**
     * Limit how many properties to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: propertiesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * properties upsert
   */
  export type propertiesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the properties
     */
    select?: propertiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the properties
     */
    omit?: propertiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: propertiesInclude<ExtArgs> | null
    /**
     * The filter to search for the properties to update in case it exists.
     */
    where: propertiesWhereUniqueInput
    /**
     * In case the properties found by the `where` argument doesn't exist, create a new properties with this data.
     */
    create: XOR<propertiesCreateInput, propertiesUncheckedCreateInput>
    /**
     * In case the properties was found with the provided `where` argument, update it with this data.
     */
    update: XOR<propertiesUpdateInput, propertiesUncheckedUpdateInput>
  }

  /**
   * properties delete
   */
  export type propertiesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the properties
     */
    select?: propertiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the properties
     */
    omit?: propertiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: propertiesInclude<ExtArgs> | null
    /**
     * Filter which properties to delete.
     */
    where: propertiesWhereUniqueInput
  }

  /**
   * properties deleteMany
   */
  export type propertiesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which properties to delete
     */
    where?: propertiesWhereInput
    /**
     * Limit how many properties to delete.
     */
    limit?: number
  }

  /**
   * properties.bookings
   */
  export type properties$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookings
     */
    select?: bookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookings
     */
    omit?: bookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookingsInclude<ExtArgs> | null
    where?: bookingsWhereInput
    orderBy?: bookingsOrderByWithRelationInput | bookingsOrderByWithRelationInput[]
    cursor?: bookingsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookingsScalarFieldEnum | BookingsScalarFieldEnum[]
  }

  /**
   * properties.peak_season_rates
   */
  export type properties$peak_season_ratesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the peak_season_rates
     */
    select?: peak_season_ratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the peak_season_rates
     */
    omit?: peak_season_ratesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: peak_season_ratesInclude<ExtArgs> | null
    where?: peak_season_ratesWhereInput
    orderBy?: peak_season_ratesOrderByWithRelationInput | peak_season_ratesOrderByWithRelationInput[]
    cursor?: peak_season_ratesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Peak_season_ratesScalarFieldEnum | Peak_season_ratesScalarFieldEnum[]
  }

  /**
   * properties.property_images
   */
  export type properties$property_imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the property_images
     */
    select?: property_imagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the property_images
     */
    omit?: property_imagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: property_imagesInclude<ExtArgs> | null
    where?: property_imagesWhereInput
    orderBy?: property_imagesOrderByWithRelationInput | property_imagesOrderByWithRelationInput[]
    cursor?: property_imagesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Property_imagesScalarFieldEnum | Property_imagesScalarFieldEnum[]
  }

  /**
   * properties.reviews
   */
  export type properties$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    where?: reviewsWhereInput
    orderBy?: reviewsOrderByWithRelationInput | reviewsOrderByWithRelationInput[]
    cursor?: reviewsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewsScalarFieldEnum | ReviewsScalarFieldEnum[]
  }

  /**
   * properties.rooms
   */
  export type properties$roomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rooms
     */
    select?: roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rooms
     */
    omit?: roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: roomsInclude<ExtArgs> | null
    where?: roomsWhereInput
    orderBy?: roomsOrderByWithRelationInput | roomsOrderByWithRelationInput[]
    cursor?: roomsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomsScalarFieldEnum | RoomsScalarFieldEnum[]
  }

  /**
   * properties without action
   */
  export type propertiesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the properties
     */
    select?: propertiesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the properties
     */
    omit?: propertiesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: propertiesInclude<ExtArgs> | null
  }


  /**
   * Model property_images
   */

  export type AggregateProperty_images = {
    _count: Property_imagesCountAggregateOutputType | null
    _min: Property_imagesMinAggregateOutputType | null
    _max: Property_imagesMaxAggregateOutputType | null
  }

  export type Property_imagesMinAggregateOutputType = {
    id: string | null
    property_id: string | null
    image_url: string | null
    created_at: Date | null
  }

  export type Property_imagesMaxAggregateOutputType = {
    id: string | null
    property_id: string | null
    image_url: string | null
    created_at: Date | null
  }

  export type Property_imagesCountAggregateOutputType = {
    id: number
    property_id: number
    image_url: number
    created_at: number
    _all: number
  }


  export type Property_imagesMinAggregateInputType = {
    id?: true
    property_id?: true
    image_url?: true
    created_at?: true
  }

  export type Property_imagesMaxAggregateInputType = {
    id?: true
    property_id?: true
    image_url?: true
    created_at?: true
  }

  export type Property_imagesCountAggregateInputType = {
    id?: true
    property_id?: true
    image_url?: true
    created_at?: true
    _all?: true
  }

  export type Property_imagesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which property_images to aggregate.
     */
    where?: property_imagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of property_images to fetch.
     */
    orderBy?: property_imagesOrderByWithRelationInput | property_imagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: property_imagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` property_images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` property_images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned property_images
    **/
    _count?: true | Property_imagesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Property_imagesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Property_imagesMaxAggregateInputType
  }

  export type GetProperty_imagesAggregateType<T extends Property_imagesAggregateArgs> = {
        [P in keyof T & keyof AggregateProperty_images]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProperty_images[P]>
      : GetScalarType<T[P], AggregateProperty_images[P]>
  }




  export type property_imagesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: property_imagesWhereInput
    orderBy?: property_imagesOrderByWithAggregationInput | property_imagesOrderByWithAggregationInput[]
    by: Property_imagesScalarFieldEnum[] | Property_imagesScalarFieldEnum
    having?: property_imagesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Property_imagesCountAggregateInputType | true
    _min?: Property_imagesMinAggregateInputType
    _max?: Property_imagesMaxAggregateInputType
  }

  export type Property_imagesGroupByOutputType = {
    id: string
    property_id: string
    image_url: string
    created_at: Date
    _count: Property_imagesCountAggregateOutputType | null
    _min: Property_imagesMinAggregateOutputType | null
    _max: Property_imagesMaxAggregateOutputType | null
  }

  type GetProperty_imagesGroupByPayload<T extends property_imagesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Property_imagesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Property_imagesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Property_imagesGroupByOutputType[P]>
            : GetScalarType<T[P], Property_imagesGroupByOutputType[P]>
        }
      >
    >


  export type property_imagesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    property_id?: boolean
    image_url?: boolean
    created_at?: boolean
    property?: boolean | propertiesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["property_images"]>

  export type property_imagesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    property_id?: boolean
    image_url?: boolean
    created_at?: boolean
    property?: boolean | propertiesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["property_images"]>

  export type property_imagesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    property_id?: boolean
    image_url?: boolean
    created_at?: boolean
    property?: boolean | propertiesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["property_images"]>

  export type property_imagesSelectScalar = {
    id?: boolean
    property_id?: boolean
    image_url?: boolean
    created_at?: boolean
  }

  export type property_imagesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "property_id" | "image_url" | "created_at", ExtArgs["result"]["property_images"]>
  export type property_imagesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | propertiesDefaultArgs<ExtArgs>
  }
  export type property_imagesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | propertiesDefaultArgs<ExtArgs>
  }
  export type property_imagesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | propertiesDefaultArgs<ExtArgs>
  }

  export type $property_imagesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "property_images"
    objects: {
      property: Prisma.$propertiesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      property_id: string
      image_url: string
      created_at: Date
    }, ExtArgs["result"]["property_images"]>
    composites: {}
  }

  type property_imagesGetPayload<S extends boolean | null | undefined | property_imagesDefaultArgs> = $Result.GetResult<Prisma.$property_imagesPayload, S>

  type property_imagesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<property_imagesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Property_imagesCountAggregateInputType | true
    }

  export interface property_imagesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['property_images'], meta: { name: 'property_images' } }
    /**
     * Find zero or one Property_images that matches the filter.
     * @param {property_imagesFindUniqueArgs} args - Arguments to find a Property_images
     * @example
     * // Get one Property_images
     * const property_images = await prisma.property_images.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends property_imagesFindUniqueArgs>(args: SelectSubset<T, property_imagesFindUniqueArgs<ExtArgs>>): Prisma__property_imagesClient<$Result.GetResult<Prisma.$property_imagesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Property_images that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {property_imagesFindUniqueOrThrowArgs} args - Arguments to find a Property_images
     * @example
     * // Get one Property_images
     * const property_images = await prisma.property_images.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends property_imagesFindUniqueOrThrowArgs>(args: SelectSubset<T, property_imagesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__property_imagesClient<$Result.GetResult<Prisma.$property_imagesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Property_images that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {property_imagesFindFirstArgs} args - Arguments to find a Property_images
     * @example
     * // Get one Property_images
     * const property_images = await prisma.property_images.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends property_imagesFindFirstArgs>(args?: SelectSubset<T, property_imagesFindFirstArgs<ExtArgs>>): Prisma__property_imagesClient<$Result.GetResult<Prisma.$property_imagesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Property_images that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {property_imagesFindFirstOrThrowArgs} args - Arguments to find a Property_images
     * @example
     * // Get one Property_images
     * const property_images = await prisma.property_images.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends property_imagesFindFirstOrThrowArgs>(args?: SelectSubset<T, property_imagesFindFirstOrThrowArgs<ExtArgs>>): Prisma__property_imagesClient<$Result.GetResult<Prisma.$property_imagesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Property_images that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {property_imagesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Property_images
     * const property_images = await prisma.property_images.findMany()
     * 
     * // Get first 10 Property_images
     * const property_images = await prisma.property_images.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const property_imagesWithIdOnly = await prisma.property_images.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends property_imagesFindManyArgs>(args?: SelectSubset<T, property_imagesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$property_imagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Property_images.
     * @param {property_imagesCreateArgs} args - Arguments to create a Property_images.
     * @example
     * // Create one Property_images
     * const Property_images = await prisma.property_images.create({
     *   data: {
     *     // ... data to create a Property_images
     *   }
     * })
     * 
     */
    create<T extends property_imagesCreateArgs>(args: SelectSubset<T, property_imagesCreateArgs<ExtArgs>>): Prisma__property_imagesClient<$Result.GetResult<Prisma.$property_imagesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Property_images.
     * @param {property_imagesCreateManyArgs} args - Arguments to create many Property_images.
     * @example
     * // Create many Property_images
     * const property_images = await prisma.property_images.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends property_imagesCreateManyArgs>(args?: SelectSubset<T, property_imagesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Property_images and returns the data saved in the database.
     * @param {property_imagesCreateManyAndReturnArgs} args - Arguments to create many Property_images.
     * @example
     * // Create many Property_images
     * const property_images = await prisma.property_images.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Property_images and only return the `id`
     * const property_imagesWithIdOnly = await prisma.property_images.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends property_imagesCreateManyAndReturnArgs>(args?: SelectSubset<T, property_imagesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$property_imagesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Property_images.
     * @param {property_imagesDeleteArgs} args - Arguments to delete one Property_images.
     * @example
     * // Delete one Property_images
     * const Property_images = await prisma.property_images.delete({
     *   where: {
     *     // ... filter to delete one Property_images
     *   }
     * })
     * 
     */
    delete<T extends property_imagesDeleteArgs>(args: SelectSubset<T, property_imagesDeleteArgs<ExtArgs>>): Prisma__property_imagesClient<$Result.GetResult<Prisma.$property_imagesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Property_images.
     * @param {property_imagesUpdateArgs} args - Arguments to update one Property_images.
     * @example
     * // Update one Property_images
     * const property_images = await prisma.property_images.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends property_imagesUpdateArgs>(args: SelectSubset<T, property_imagesUpdateArgs<ExtArgs>>): Prisma__property_imagesClient<$Result.GetResult<Prisma.$property_imagesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Property_images.
     * @param {property_imagesDeleteManyArgs} args - Arguments to filter Property_images to delete.
     * @example
     * // Delete a few Property_images
     * const { count } = await prisma.property_images.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends property_imagesDeleteManyArgs>(args?: SelectSubset<T, property_imagesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Property_images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {property_imagesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Property_images
     * const property_images = await prisma.property_images.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends property_imagesUpdateManyArgs>(args: SelectSubset<T, property_imagesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Property_images and returns the data updated in the database.
     * @param {property_imagesUpdateManyAndReturnArgs} args - Arguments to update many Property_images.
     * @example
     * // Update many Property_images
     * const property_images = await prisma.property_images.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Property_images and only return the `id`
     * const property_imagesWithIdOnly = await prisma.property_images.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends property_imagesUpdateManyAndReturnArgs>(args: SelectSubset<T, property_imagesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$property_imagesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Property_images.
     * @param {property_imagesUpsertArgs} args - Arguments to update or create a Property_images.
     * @example
     * // Update or create a Property_images
     * const property_images = await prisma.property_images.upsert({
     *   create: {
     *     // ... data to create a Property_images
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Property_images we want to update
     *   }
     * })
     */
    upsert<T extends property_imagesUpsertArgs>(args: SelectSubset<T, property_imagesUpsertArgs<ExtArgs>>): Prisma__property_imagesClient<$Result.GetResult<Prisma.$property_imagesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Property_images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {property_imagesCountArgs} args - Arguments to filter Property_images to count.
     * @example
     * // Count the number of Property_images
     * const count = await prisma.property_images.count({
     *   where: {
     *     // ... the filter for the Property_images we want to count
     *   }
     * })
    **/
    count<T extends property_imagesCountArgs>(
      args?: Subset<T, property_imagesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Property_imagesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Property_images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Property_imagesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Property_imagesAggregateArgs>(args: Subset<T, Property_imagesAggregateArgs>): Prisma.PrismaPromise<GetProperty_imagesAggregateType<T>>

    /**
     * Group by Property_images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {property_imagesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends property_imagesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: property_imagesGroupByArgs['orderBy'] }
        : { orderBy?: property_imagesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, property_imagesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProperty_imagesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the property_images model
   */
  readonly fields: property_imagesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for property_images.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__property_imagesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    property<T extends propertiesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, propertiesDefaultArgs<ExtArgs>>): Prisma__propertiesClient<$Result.GetResult<Prisma.$propertiesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the property_images model
   */
  interface property_imagesFieldRefs {
    readonly id: FieldRef<"property_images", 'String'>
    readonly property_id: FieldRef<"property_images", 'String'>
    readonly image_url: FieldRef<"property_images", 'String'>
    readonly created_at: FieldRef<"property_images", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * property_images findUnique
   */
  export type property_imagesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the property_images
     */
    select?: property_imagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the property_images
     */
    omit?: property_imagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: property_imagesInclude<ExtArgs> | null
    /**
     * Filter, which property_images to fetch.
     */
    where: property_imagesWhereUniqueInput
  }

  /**
   * property_images findUniqueOrThrow
   */
  export type property_imagesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the property_images
     */
    select?: property_imagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the property_images
     */
    omit?: property_imagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: property_imagesInclude<ExtArgs> | null
    /**
     * Filter, which property_images to fetch.
     */
    where: property_imagesWhereUniqueInput
  }

  /**
   * property_images findFirst
   */
  export type property_imagesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the property_images
     */
    select?: property_imagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the property_images
     */
    omit?: property_imagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: property_imagesInclude<ExtArgs> | null
    /**
     * Filter, which property_images to fetch.
     */
    where?: property_imagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of property_images to fetch.
     */
    orderBy?: property_imagesOrderByWithRelationInput | property_imagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for property_images.
     */
    cursor?: property_imagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` property_images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` property_images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of property_images.
     */
    distinct?: Property_imagesScalarFieldEnum | Property_imagesScalarFieldEnum[]
  }

  /**
   * property_images findFirstOrThrow
   */
  export type property_imagesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the property_images
     */
    select?: property_imagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the property_images
     */
    omit?: property_imagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: property_imagesInclude<ExtArgs> | null
    /**
     * Filter, which property_images to fetch.
     */
    where?: property_imagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of property_images to fetch.
     */
    orderBy?: property_imagesOrderByWithRelationInput | property_imagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for property_images.
     */
    cursor?: property_imagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` property_images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` property_images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of property_images.
     */
    distinct?: Property_imagesScalarFieldEnum | Property_imagesScalarFieldEnum[]
  }

  /**
   * property_images findMany
   */
  export type property_imagesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the property_images
     */
    select?: property_imagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the property_images
     */
    omit?: property_imagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: property_imagesInclude<ExtArgs> | null
    /**
     * Filter, which property_images to fetch.
     */
    where?: property_imagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of property_images to fetch.
     */
    orderBy?: property_imagesOrderByWithRelationInput | property_imagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing property_images.
     */
    cursor?: property_imagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` property_images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` property_images.
     */
    skip?: number
    distinct?: Property_imagesScalarFieldEnum | Property_imagesScalarFieldEnum[]
  }

  /**
   * property_images create
   */
  export type property_imagesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the property_images
     */
    select?: property_imagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the property_images
     */
    omit?: property_imagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: property_imagesInclude<ExtArgs> | null
    /**
     * The data needed to create a property_images.
     */
    data: XOR<property_imagesCreateInput, property_imagesUncheckedCreateInput>
  }

  /**
   * property_images createMany
   */
  export type property_imagesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many property_images.
     */
    data: property_imagesCreateManyInput | property_imagesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * property_images createManyAndReturn
   */
  export type property_imagesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the property_images
     */
    select?: property_imagesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the property_images
     */
    omit?: property_imagesOmit<ExtArgs> | null
    /**
     * The data used to create many property_images.
     */
    data: property_imagesCreateManyInput | property_imagesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: property_imagesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * property_images update
   */
  export type property_imagesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the property_images
     */
    select?: property_imagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the property_images
     */
    omit?: property_imagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: property_imagesInclude<ExtArgs> | null
    /**
     * The data needed to update a property_images.
     */
    data: XOR<property_imagesUpdateInput, property_imagesUncheckedUpdateInput>
    /**
     * Choose, which property_images to update.
     */
    where: property_imagesWhereUniqueInput
  }

  /**
   * property_images updateMany
   */
  export type property_imagesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update property_images.
     */
    data: XOR<property_imagesUpdateManyMutationInput, property_imagesUncheckedUpdateManyInput>
    /**
     * Filter which property_images to update
     */
    where?: property_imagesWhereInput
    /**
     * Limit how many property_images to update.
     */
    limit?: number
  }

  /**
   * property_images updateManyAndReturn
   */
  export type property_imagesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the property_images
     */
    select?: property_imagesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the property_images
     */
    omit?: property_imagesOmit<ExtArgs> | null
    /**
     * The data used to update property_images.
     */
    data: XOR<property_imagesUpdateManyMutationInput, property_imagesUncheckedUpdateManyInput>
    /**
     * Filter which property_images to update
     */
    where?: property_imagesWhereInput
    /**
     * Limit how many property_images to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: property_imagesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * property_images upsert
   */
  export type property_imagesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the property_images
     */
    select?: property_imagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the property_images
     */
    omit?: property_imagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: property_imagesInclude<ExtArgs> | null
    /**
     * The filter to search for the property_images to update in case it exists.
     */
    where: property_imagesWhereUniqueInput
    /**
     * In case the property_images found by the `where` argument doesn't exist, create a new property_images with this data.
     */
    create: XOR<property_imagesCreateInput, property_imagesUncheckedCreateInput>
    /**
     * In case the property_images was found with the provided `where` argument, update it with this data.
     */
    update: XOR<property_imagesUpdateInput, property_imagesUncheckedUpdateInput>
  }

  /**
   * property_images delete
   */
  export type property_imagesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the property_images
     */
    select?: property_imagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the property_images
     */
    omit?: property_imagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: property_imagesInclude<ExtArgs> | null
    /**
     * Filter which property_images to delete.
     */
    where: property_imagesWhereUniqueInput
  }

  /**
   * property_images deleteMany
   */
  export type property_imagesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which property_images to delete
     */
    where?: property_imagesWhereInput
    /**
     * Limit how many property_images to delete.
     */
    limit?: number
  }

  /**
   * property_images without action
   */
  export type property_imagesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the property_images
     */
    select?: property_imagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the property_images
     */
    omit?: property_imagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: property_imagesInclude<ExtArgs> | null
  }


  /**
   * Model rooms
   */

  export type AggregateRooms = {
    _count: RoomsCountAggregateOutputType | null
    _avg: RoomsAvgAggregateOutputType | null
    _sum: RoomsSumAggregateOutputType | null
    _min: RoomsMinAggregateOutputType | null
    _max: RoomsMaxAggregateOutputType | null
  }

  export type RoomsAvgAggregateOutputType = {
    base_price: Decimal | null
    capacity: number | null
    total_rooms: number | null
  }

  export type RoomsSumAggregateOutputType = {
    base_price: Decimal | null
    capacity: number | null
    total_rooms: number | null
  }

  export type RoomsMinAggregateOutputType = {
    id: string | null
    property_id: string | null
    name: string | null
    description: string | null
    base_price: Decimal | null
    capacity: number | null
    image: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
    total_rooms: number | null
  }

  export type RoomsMaxAggregateOutputType = {
    id: string | null
    property_id: string | null
    name: string | null
    description: string | null
    base_price: Decimal | null
    capacity: number | null
    image: string | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
    total_rooms: number | null
  }

  export type RoomsCountAggregateOutputType = {
    id: number
    property_id: number
    name: number
    description: number
    base_price: number
    capacity: number
    image: number
    created_at: number
    updated_at: number
    deleted_at: number
    total_rooms: number
    _all: number
  }


  export type RoomsAvgAggregateInputType = {
    base_price?: true
    capacity?: true
    total_rooms?: true
  }

  export type RoomsSumAggregateInputType = {
    base_price?: true
    capacity?: true
    total_rooms?: true
  }

  export type RoomsMinAggregateInputType = {
    id?: true
    property_id?: true
    name?: true
    description?: true
    base_price?: true
    capacity?: true
    image?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    total_rooms?: true
  }

  export type RoomsMaxAggregateInputType = {
    id?: true
    property_id?: true
    name?: true
    description?: true
    base_price?: true
    capacity?: true
    image?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    total_rooms?: true
  }

  export type RoomsCountAggregateInputType = {
    id?: true
    property_id?: true
    name?: true
    description?: true
    base_price?: true
    capacity?: true
    image?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    total_rooms?: true
    _all?: true
  }

  export type RoomsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which rooms to aggregate.
     */
    where?: roomsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of rooms to fetch.
     */
    orderBy?: roomsOrderByWithRelationInput | roomsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: roomsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned rooms
    **/
    _count?: true | RoomsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoomsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoomsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomsMaxAggregateInputType
  }

  export type GetRoomsAggregateType<T extends RoomsAggregateArgs> = {
        [P in keyof T & keyof AggregateRooms]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRooms[P]>
      : GetScalarType<T[P], AggregateRooms[P]>
  }




  export type roomsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: roomsWhereInput
    orderBy?: roomsOrderByWithAggregationInput | roomsOrderByWithAggregationInput[]
    by: RoomsScalarFieldEnum[] | RoomsScalarFieldEnum
    having?: roomsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomsCountAggregateInputType | true
    _avg?: RoomsAvgAggregateInputType
    _sum?: RoomsSumAggregateInputType
    _min?: RoomsMinAggregateInputType
    _max?: RoomsMaxAggregateInputType
  }

  export type RoomsGroupByOutputType = {
    id: string
    property_id: string
    name: string
    description: string | null
    base_price: Decimal
    capacity: number
    image: string | null
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    total_rooms: number
    _count: RoomsCountAggregateOutputType | null
    _avg: RoomsAvgAggregateOutputType | null
    _sum: RoomsSumAggregateOutputType | null
    _min: RoomsMinAggregateOutputType | null
    _max: RoomsMaxAggregateOutputType | null
  }

  type GetRoomsGroupByPayload<T extends roomsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomsGroupByOutputType[P]>
            : GetScalarType<T[P], RoomsGroupByOutputType[P]>
        }
      >
    >


  export type roomsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    property_id?: boolean
    name?: boolean
    description?: boolean
    base_price?: boolean
    capacity?: boolean
    image?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    total_rooms?: boolean
    booking_rooms?: boolean | rooms$booking_roomsArgs<ExtArgs>
    peak_season_rates?: boolean | rooms$peak_season_ratesArgs<ExtArgs>
    room_availability?: boolean | rooms$room_availabilityArgs<ExtArgs>
    room_images?: boolean | rooms$room_imagesArgs<ExtArgs>
    property?: boolean | propertiesDefaultArgs<ExtArgs>
    _count?: boolean | RoomsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rooms"]>

  export type roomsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    property_id?: boolean
    name?: boolean
    description?: boolean
    base_price?: boolean
    capacity?: boolean
    image?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    total_rooms?: boolean
    property?: boolean | propertiesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rooms"]>

  export type roomsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    property_id?: boolean
    name?: boolean
    description?: boolean
    base_price?: boolean
    capacity?: boolean
    image?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    total_rooms?: boolean
    property?: boolean | propertiesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["rooms"]>

  export type roomsSelectScalar = {
    id?: boolean
    property_id?: boolean
    name?: boolean
    description?: boolean
    base_price?: boolean
    capacity?: boolean
    image?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    total_rooms?: boolean
  }

  export type roomsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "property_id" | "name" | "description" | "base_price" | "capacity" | "image" | "created_at" | "updated_at" | "deleted_at" | "total_rooms", ExtArgs["result"]["rooms"]>
  export type roomsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking_rooms?: boolean | rooms$booking_roomsArgs<ExtArgs>
    peak_season_rates?: boolean | rooms$peak_season_ratesArgs<ExtArgs>
    room_availability?: boolean | rooms$room_availabilityArgs<ExtArgs>
    room_images?: boolean | rooms$room_imagesArgs<ExtArgs>
    property?: boolean | propertiesDefaultArgs<ExtArgs>
    _count?: boolean | RoomsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type roomsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | propertiesDefaultArgs<ExtArgs>
  }
  export type roomsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | propertiesDefaultArgs<ExtArgs>
  }

  export type $roomsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "rooms"
    objects: {
      booking_rooms: Prisma.$booking_roomsPayload<ExtArgs>[]
      peak_season_rates: Prisma.$peak_season_ratesPayload<ExtArgs>[]
      room_availability: Prisma.$room_availabilityPayload<ExtArgs>[]
      room_images: Prisma.$room_imagesPayload<ExtArgs>[]
      property: Prisma.$propertiesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      property_id: string
      name: string
      description: string | null
      base_price: Prisma.Decimal
      capacity: number
      image: string | null
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
      total_rooms: number
    }, ExtArgs["result"]["rooms"]>
    composites: {}
  }

  type roomsGetPayload<S extends boolean | null | undefined | roomsDefaultArgs> = $Result.GetResult<Prisma.$roomsPayload, S>

  type roomsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<roomsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomsCountAggregateInputType | true
    }

  export interface roomsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['rooms'], meta: { name: 'rooms' } }
    /**
     * Find zero or one Rooms that matches the filter.
     * @param {roomsFindUniqueArgs} args - Arguments to find a Rooms
     * @example
     * // Get one Rooms
     * const rooms = await prisma.rooms.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends roomsFindUniqueArgs>(args: SelectSubset<T, roomsFindUniqueArgs<ExtArgs>>): Prisma__roomsClient<$Result.GetResult<Prisma.$roomsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Rooms that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {roomsFindUniqueOrThrowArgs} args - Arguments to find a Rooms
     * @example
     * // Get one Rooms
     * const rooms = await prisma.rooms.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends roomsFindUniqueOrThrowArgs>(args: SelectSubset<T, roomsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__roomsClient<$Result.GetResult<Prisma.$roomsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {roomsFindFirstArgs} args - Arguments to find a Rooms
     * @example
     * // Get one Rooms
     * const rooms = await prisma.rooms.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends roomsFindFirstArgs>(args?: SelectSubset<T, roomsFindFirstArgs<ExtArgs>>): Prisma__roomsClient<$Result.GetResult<Prisma.$roomsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Rooms that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {roomsFindFirstOrThrowArgs} args - Arguments to find a Rooms
     * @example
     * // Get one Rooms
     * const rooms = await prisma.rooms.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends roomsFindFirstOrThrowArgs>(args?: SelectSubset<T, roomsFindFirstOrThrowArgs<ExtArgs>>): Prisma__roomsClient<$Result.GetResult<Prisma.$roomsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Rooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {roomsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rooms
     * const rooms = await prisma.rooms.findMany()
     * 
     * // Get first 10 Rooms
     * const rooms = await prisma.rooms.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomsWithIdOnly = await prisma.rooms.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends roomsFindManyArgs>(args?: SelectSubset<T, roomsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$roomsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Rooms.
     * @param {roomsCreateArgs} args - Arguments to create a Rooms.
     * @example
     * // Create one Rooms
     * const Rooms = await prisma.rooms.create({
     *   data: {
     *     // ... data to create a Rooms
     *   }
     * })
     * 
     */
    create<T extends roomsCreateArgs>(args: SelectSubset<T, roomsCreateArgs<ExtArgs>>): Prisma__roomsClient<$Result.GetResult<Prisma.$roomsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Rooms.
     * @param {roomsCreateManyArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const rooms = await prisma.rooms.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends roomsCreateManyArgs>(args?: SelectSubset<T, roomsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rooms and returns the data saved in the database.
     * @param {roomsCreateManyAndReturnArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const rooms = await prisma.rooms.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rooms and only return the `id`
     * const roomsWithIdOnly = await prisma.rooms.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends roomsCreateManyAndReturnArgs>(args?: SelectSubset<T, roomsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$roomsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Rooms.
     * @param {roomsDeleteArgs} args - Arguments to delete one Rooms.
     * @example
     * // Delete one Rooms
     * const Rooms = await prisma.rooms.delete({
     *   where: {
     *     // ... filter to delete one Rooms
     *   }
     * })
     * 
     */
    delete<T extends roomsDeleteArgs>(args: SelectSubset<T, roomsDeleteArgs<ExtArgs>>): Prisma__roomsClient<$Result.GetResult<Prisma.$roomsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Rooms.
     * @param {roomsUpdateArgs} args - Arguments to update one Rooms.
     * @example
     * // Update one Rooms
     * const rooms = await prisma.rooms.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends roomsUpdateArgs>(args: SelectSubset<T, roomsUpdateArgs<ExtArgs>>): Prisma__roomsClient<$Result.GetResult<Prisma.$roomsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Rooms.
     * @param {roomsDeleteManyArgs} args - Arguments to filter Rooms to delete.
     * @example
     * // Delete a few Rooms
     * const { count } = await prisma.rooms.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends roomsDeleteManyArgs>(args?: SelectSubset<T, roomsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {roomsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rooms
     * const rooms = await prisma.rooms.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends roomsUpdateManyArgs>(args: SelectSubset<T, roomsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms and returns the data updated in the database.
     * @param {roomsUpdateManyAndReturnArgs} args - Arguments to update many Rooms.
     * @example
     * // Update many Rooms
     * const rooms = await prisma.rooms.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Rooms and only return the `id`
     * const roomsWithIdOnly = await prisma.rooms.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends roomsUpdateManyAndReturnArgs>(args: SelectSubset<T, roomsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$roomsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Rooms.
     * @param {roomsUpsertArgs} args - Arguments to update or create a Rooms.
     * @example
     * // Update or create a Rooms
     * const rooms = await prisma.rooms.upsert({
     *   create: {
     *     // ... data to create a Rooms
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Rooms we want to update
     *   }
     * })
     */
    upsert<T extends roomsUpsertArgs>(args: SelectSubset<T, roomsUpsertArgs<ExtArgs>>): Prisma__roomsClient<$Result.GetResult<Prisma.$roomsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {roomsCountArgs} args - Arguments to filter Rooms to count.
     * @example
     * // Count the number of Rooms
     * const count = await prisma.rooms.count({
     *   where: {
     *     // ... the filter for the Rooms we want to count
     *   }
     * })
    **/
    count<T extends roomsCountArgs>(
      args?: Subset<T, roomsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomsAggregateArgs>(args: Subset<T, RoomsAggregateArgs>): Prisma.PrismaPromise<GetRoomsAggregateType<T>>

    /**
     * Group by Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {roomsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends roomsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: roomsGroupByArgs['orderBy'] }
        : { orderBy?: roomsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, roomsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the rooms model
   */
  readonly fields: roomsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for rooms.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__roomsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    booking_rooms<T extends rooms$booking_roomsArgs<ExtArgs> = {}>(args?: Subset<T, rooms$booking_roomsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$booking_roomsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    peak_season_rates<T extends rooms$peak_season_ratesArgs<ExtArgs> = {}>(args?: Subset<T, rooms$peak_season_ratesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$peak_season_ratesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    room_availability<T extends rooms$room_availabilityArgs<ExtArgs> = {}>(args?: Subset<T, rooms$room_availabilityArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$room_availabilityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    room_images<T extends rooms$room_imagesArgs<ExtArgs> = {}>(args?: Subset<T, rooms$room_imagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$room_imagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    property<T extends propertiesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, propertiesDefaultArgs<ExtArgs>>): Prisma__propertiesClient<$Result.GetResult<Prisma.$propertiesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the rooms model
   */
  interface roomsFieldRefs {
    readonly id: FieldRef<"rooms", 'String'>
    readonly property_id: FieldRef<"rooms", 'String'>
    readonly name: FieldRef<"rooms", 'String'>
    readonly description: FieldRef<"rooms", 'String'>
    readonly base_price: FieldRef<"rooms", 'Decimal'>
    readonly capacity: FieldRef<"rooms", 'Int'>
    readonly image: FieldRef<"rooms", 'String'>
    readonly created_at: FieldRef<"rooms", 'DateTime'>
    readonly updated_at: FieldRef<"rooms", 'DateTime'>
    readonly deleted_at: FieldRef<"rooms", 'DateTime'>
    readonly total_rooms: FieldRef<"rooms", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * rooms findUnique
   */
  export type roomsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rooms
     */
    select?: roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rooms
     */
    omit?: roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: roomsInclude<ExtArgs> | null
    /**
     * Filter, which rooms to fetch.
     */
    where: roomsWhereUniqueInput
  }

  /**
   * rooms findUniqueOrThrow
   */
  export type roomsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rooms
     */
    select?: roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rooms
     */
    omit?: roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: roomsInclude<ExtArgs> | null
    /**
     * Filter, which rooms to fetch.
     */
    where: roomsWhereUniqueInput
  }

  /**
   * rooms findFirst
   */
  export type roomsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rooms
     */
    select?: roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rooms
     */
    omit?: roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: roomsInclude<ExtArgs> | null
    /**
     * Filter, which rooms to fetch.
     */
    where?: roomsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of rooms to fetch.
     */
    orderBy?: roomsOrderByWithRelationInput | roomsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for rooms.
     */
    cursor?: roomsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of rooms.
     */
    distinct?: RoomsScalarFieldEnum | RoomsScalarFieldEnum[]
  }

  /**
   * rooms findFirstOrThrow
   */
  export type roomsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rooms
     */
    select?: roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rooms
     */
    omit?: roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: roomsInclude<ExtArgs> | null
    /**
     * Filter, which rooms to fetch.
     */
    where?: roomsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of rooms to fetch.
     */
    orderBy?: roomsOrderByWithRelationInput | roomsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for rooms.
     */
    cursor?: roomsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of rooms.
     */
    distinct?: RoomsScalarFieldEnum | RoomsScalarFieldEnum[]
  }

  /**
   * rooms findMany
   */
  export type roomsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rooms
     */
    select?: roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rooms
     */
    omit?: roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: roomsInclude<ExtArgs> | null
    /**
     * Filter, which rooms to fetch.
     */
    where?: roomsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of rooms to fetch.
     */
    orderBy?: roomsOrderByWithRelationInput | roomsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing rooms.
     */
    cursor?: roomsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` rooms.
     */
    skip?: number
    distinct?: RoomsScalarFieldEnum | RoomsScalarFieldEnum[]
  }

  /**
   * rooms create
   */
  export type roomsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rooms
     */
    select?: roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rooms
     */
    omit?: roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: roomsInclude<ExtArgs> | null
    /**
     * The data needed to create a rooms.
     */
    data: XOR<roomsCreateInput, roomsUncheckedCreateInput>
  }

  /**
   * rooms createMany
   */
  export type roomsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many rooms.
     */
    data: roomsCreateManyInput | roomsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * rooms createManyAndReturn
   */
  export type roomsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rooms
     */
    select?: roomsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the rooms
     */
    omit?: roomsOmit<ExtArgs> | null
    /**
     * The data used to create many rooms.
     */
    data: roomsCreateManyInput | roomsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: roomsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * rooms update
   */
  export type roomsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rooms
     */
    select?: roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rooms
     */
    omit?: roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: roomsInclude<ExtArgs> | null
    /**
     * The data needed to update a rooms.
     */
    data: XOR<roomsUpdateInput, roomsUncheckedUpdateInput>
    /**
     * Choose, which rooms to update.
     */
    where: roomsWhereUniqueInput
  }

  /**
   * rooms updateMany
   */
  export type roomsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update rooms.
     */
    data: XOR<roomsUpdateManyMutationInput, roomsUncheckedUpdateManyInput>
    /**
     * Filter which rooms to update
     */
    where?: roomsWhereInput
    /**
     * Limit how many rooms to update.
     */
    limit?: number
  }

  /**
   * rooms updateManyAndReturn
   */
  export type roomsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rooms
     */
    select?: roomsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the rooms
     */
    omit?: roomsOmit<ExtArgs> | null
    /**
     * The data used to update rooms.
     */
    data: XOR<roomsUpdateManyMutationInput, roomsUncheckedUpdateManyInput>
    /**
     * Filter which rooms to update
     */
    where?: roomsWhereInput
    /**
     * Limit how many rooms to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: roomsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * rooms upsert
   */
  export type roomsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rooms
     */
    select?: roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rooms
     */
    omit?: roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: roomsInclude<ExtArgs> | null
    /**
     * The filter to search for the rooms to update in case it exists.
     */
    where: roomsWhereUniqueInput
    /**
     * In case the rooms found by the `where` argument doesn't exist, create a new rooms with this data.
     */
    create: XOR<roomsCreateInput, roomsUncheckedCreateInput>
    /**
     * In case the rooms was found with the provided `where` argument, update it with this data.
     */
    update: XOR<roomsUpdateInput, roomsUncheckedUpdateInput>
  }

  /**
   * rooms delete
   */
  export type roomsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rooms
     */
    select?: roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rooms
     */
    omit?: roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: roomsInclude<ExtArgs> | null
    /**
     * Filter which rooms to delete.
     */
    where: roomsWhereUniqueInput
  }

  /**
   * rooms deleteMany
   */
  export type roomsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which rooms to delete
     */
    where?: roomsWhereInput
    /**
     * Limit how many rooms to delete.
     */
    limit?: number
  }

  /**
   * rooms.booking_rooms
   */
  export type rooms$booking_roomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the booking_rooms
     */
    select?: booking_roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the booking_rooms
     */
    omit?: booking_roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: booking_roomsInclude<ExtArgs> | null
    where?: booking_roomsWhereInput
    orderBy?: booking_roomsOrderByWithRelationInput | booking_roomsOrderByWithRelationInput[]
    cursor?: booking_roomsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Booking_roomsScalarFieldEnum | Booking_roomsScalarFieldEnum[]
  }

  /**
   * rooms.peak_season_rates
   */
  export type rooms$peak_season_ratesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the peak_season_rates
     */
    select?: peak_season_ratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the peak_season_rates
     */
    omit?: peak_season_ratesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: peak_season_ratesInclude<ExtArgs> | null
    where?: peak_season_ratesWhereInput
    orderBy?: peak_season_ratesOrderByWithRelationInput | peak_season_ratesOrderByWithRelationInput[]
    cursor?: peak_season_ratesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Peak_season_ratesScalarFieldEnum | Peak_season_ratesScalarFieldEnum[]
  }

  /**
   * rooms.room_availability
   */
  export type rooms$room_availabilityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_availability
     */
    select?: room_availabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_availability
     */
    omit?: room_availabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_availabilityInclude<ExtArgs> | null
    where?: room_availabilityWhereInput
    orderBy?: room_availabilityOrderByWithRelationInput | room_availabilityOrderByWithRelationInput[]
    cursor?: room_availabilityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Room_availabilityScalarFieldEnum | Room_availabilityScalarFieldEnum[]
  }

  /**
   * rooms.room_images
   */
  export type rooms$room_imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_images
     */
    select?: room_imagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_images
     */
    omit?: room_imagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_imagesInclude<ExtArgs> | null
    where?: room_imagesWhereInput
    orderBy?: room_imagesOrderByWithRelationInput | room_imagesOrderByWithRelationInput[]
    cursor?: room_imagesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Room_imagesScalarFieldEnum | Room_imagesScalarFieldEnum[]
  }

  /**
   * rooms without action
   */
  export type roomsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the rooms
     */
    select?: roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the rooms
     */
    omit?: roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: roomsInclude<ExtArgs> | null
  }


  /**
   * Model room_images
   */

  export type AggregateRoom_images = {
    _count: Room_imagesCountAggregateOutputType | null
    _min: Room_imagesMinAggregateOutputType | null
    _max: Room_imagesMaxAggregateOutputType | null
  }

  export type Room_imagesMinAggregateOutputType = {
    id: string | null
    room_id: string | null
    image_url: string | null
    created_at: Date | null
  }

  export type Room_imagesMaxAggregateOutputType = {
    id: string | null
    room_id: string | null
    image_url: string | null
    created_at: Date | null
  }

  export type Room_imagesCountAggregateOutputType = {
    id: number
    room_id: number
    image_url: number
    created_at: number
    _all: number
  }


  export type Room_imagesMinAggregateInputType = {
    id?: true
    room_id?: true
    image_url?: true
    created_at?: true
  }

  export type Room_imagesMaxAggregateInputType = {
    id?: true
    room_id?: true
    image_url?: true
    created_at?: true
  }

  export type Room_imagesCountAggregateInputType = {
    id?: true
    room_id?: true
    image_url?: true
    created_at?: true
    _all?: true
  }

  export type Room_imagesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which room_images to aggregate.
     */
    where?: room_imagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of room_images to fetch.
     */
    orderBy?: room_imagesOrderByWithRelationInput | room_imagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: room_imagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` room_images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` room_images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned room_images
    **/
    _count?: true | Room_imagesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Room_imagesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Room_imagesMaxAggregateInputType
  }

  export type GetRoom_imagesAggregateType<T extends Room_imagesAggregateArgs> = {
        [P in keyof T & keyof AggregateRoom_images]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoom_images[P]>
      : GetScalarType<T[P], AggregateRoom_images[P]>
  }




  export type room_imagesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: room_imagesWhereInput
    orderBy?: room_imagesOrderByWithAggregationInput | room_imagesOrderByWithAggregationInput[]
    by: Room_imagesScalarFieldEnum[] | Room_imagesScalarFieldEnum
    having?: room_imagesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Room_imagesCountAggregateInputType | true
    _min?: Room_imagesMinAggregateInputType
    _max?: Room_imagesMaxAggregateInputType
  }

  export type Room_imagesGroupByOutputType = {
    id: string
    room_id: string
    image_url: string
    created_at: Date
    _count: Room_imagesCountAggregateOutputType | null
    _min: Room_imagesMinAggregateOutputType | null
    _max: Room_imagesMaxAggregateOutputType | null
  }

  type GetRoom_imagesGroupByPayload<T extends room_imagesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Room_imagesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Room_imagesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Room_imagesGroupByOutputType[P]>
            : GetScalarType<T[P], Room_imagesGroupByOutputType[P]>
        }
      >
    >


  export type room_imagesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_id?: boolean
    image_url?: boolean
    created_at?: boolean
    room?: boolean | roomsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room_images"]>

  export type room_imagesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_id?: boolean
    image_url?: boolean
    created_at?: boolean
    room?: boolean | roomsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room_images"]>

  export type room_imagesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_id?: boolean
    image_url?: boolean
    created_at?: boolean
    room?: boolean | roomsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room_images"]>

  export type room_imagesSelectScalar = {
    id?: boolean
    room_id?: boolean
    image_url?: boolean
    created_at?: boolean
  }

  export type room_imagesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "room_id" | "image_url" | "created_at", ExtArgs["result"]["room_images"]>
  export type room_imagesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | roomsDefaultArgs<ExtArgs>
  }
  export type room_imagesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | roomsDefaultArgs<ExtArgs>
  }
  export type room_imagesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | roomsDefaultArgs<ExtArgs>
  }

  export type $room_imagesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "room_images"
    objects: {
      room: Prisma.$roomsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      room_id: string
      image_url: string
      created_at: Date
    }, ExtArgs["result"]["room_images"]>
    composites: {}
  }

  type room_imagesGetPayload<S extends boolean | null | undefined | room_imagesDefaultArgs> = $Result.GetResult<Prisma.$room_imagesPayload, S>

  type room_imagesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<room_imagesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Room_imagesCountAggregateInputType | true
    }

  export interface room_imagesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['room_images'], meta: { name: 'room_images' } }
    /**
     * Find zero or one Room_images that matches the filter.
     * @param {room_imagesFindUniqueArgs} args - Arguments to find a Room_images
     * @example
     * // Get one Room_images
     * const room_images = await prisma.room_images.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends room_imagesFindUniqueArgs>(args: SelectSubset<T, room_imagesFindUniqueArgs<ExtArgs>>): Prisma__room_imagesClient<$Result.GetResult<Prisma.$room_imagesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Room_images that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {room_imagesFindUniqueOrThrowArgs} args - Arguments to find a Room_images
     * @example
     * // Get one Room_images
     * const room_images = await prisma.room_images.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends room_imagesFindUniqueOrThrowArgs>(args: SelectSubset<T, room_imagesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__room_imagesClient<$Result.GetResult<Prisma.$room_imagesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room_images that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_imagesFindFirstArgs} args - Arguments to find a Room_images
     * @example
     * // Get one Room_images
     * const room_images = await prisma.room_images.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends room_imagesFindFirstArgs>(args?: SelectSubset<T, room_imagesFindFirstArgs<ExtArgs>>): Prisma__room_imagesClient<$Result.GetResult<Prisma.$room_imagesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room_images that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_imagesFindFirstOrThrowArgs} args - Arguments to find a Room_images
     * @example
     * // Get one Room_images
     * const room_images = await prisma.room_images.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends room_imagesFindFirstOrThrowArgs>(args?: SelectSubset<T, room_imagesFindFirstOrThrowArgs<ExtArgs>>): Prisma__room_imagesClient<$Result.GetResult<Prisma.$room_imagesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Room_images that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_imagesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Room_images
     * const room_images = await prisma.room_images.findMany()
     * 
     * // Get first 10 Room_images
     * const room_images = await prisma.room_images.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const room_imagesWithIdOnly = await prisma.room_images.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends room_imagesFindManyArgs>(args?: SelectSubset<T, room_imagesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$room_imagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Room_images.
     * @param {room_imagesCreateArgs} args - Arguments to create a Room_images.
     * @example
     * // Create one Room_images
     * const Room_images = await prisma.room_images.create({
     *   data: {
     *     // ... data to create a Room_images
     *   }
     * })
     * 
     */
    create<T extends room_imagesCreateArgs>(args: SelectSubset<T, room_imagesCreateArgs<ExtArgs>>): Prisma__room_imagesClient<$Result.GetResult<Prisma.$room_imagesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Room_images.
     * @param {room_imagesCreateManyArgs} args - Arguments to create many Room_images.
     * @example
     * // Create many Room_images
     * const room_images = await prisma.room_images.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends room_imagesCreateManyArgs>(args?: SelectSubset<T, room_imagesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Room_images and returns the data saved in the database.
     * @param {room_imagesCreateManyAndReturnArgs} args - Arguments to create many Room_images.
     * @example
     * // Create many Room_images
     * const room_images = await prisma.room_images.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Room_images and only return the `id`
     * const room_imagesWithIdOnly = await prisma.room_images.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends room_imagesCreateManyAndReturnArgs>(args?: SelectSubset<T, room_imagesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$room_imagesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Room_images.
     * @param {room_imagesDeleteArgs} args - Arguments to delete one Room_images.
     * @example
     * // Delete one Room_images
     * const Room_images = await prisma.room_images.delete({
     *   where: {
     *     // ... filter to delete one Room_images
     *   }
     * })
     * 
     */
    delete<T extends room_imagesDeleteArgs>(args: SelectSubset<T, room_imagesDeleteArgs<ExtArgs>>): Prisma__room_imagesClient<$Result.GetResult<Prisma.$room_imagesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Room_images.
     * @param {room_imagesUpdateArgs} args - Arguments to update one Room_images.
     * @example
     * // Update one Room_images
     * const room_images = await prisma.room_images.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends room_imagesUpdateArgs>(args: SelectSubset<T, room_imagesUpdateArgs<ExtArgs>>): Prisma__room_imagesClient<$Result.GetResult<Prisma.$room_imagesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Room_images.
     * @param {room_imagesDeleteManyArgs} args - Arguments to filter Room_images to delete.
     * @example
     * // Delete a few Room_images
     * const { count } = await prisma.room_images.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends room_imagesDeleteManyArgs>(args?: SelectSubset<T, room_imagesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Room_images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_imagesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Room_images
     * const room_images = await prisma.room_images.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends room_imagesUpdateManyArgs>(args: SelectSubset<T, room_imagesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Room_images and returns the data updated in the database.
     * @param {room_imagesUpdateManyAndReturnArgs} args - Arguments to update many Room_images.
     * @example
     * // Update many Room_images
     * const room_images = await prisma.room_images.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Room_images and only return the `id`
     * const room_imagesWithIdOnly = await prisma.room_images.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends room_imagesUpdateManyAndReturnArgs>(args: SelectSubset<T, room_imagesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$room_imagesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Room_images.
     * @param {room_imagesUpsertArgs} args - Arguments to update or create a Room_images.
     * @example
     * // Update or create a Room_images
     * const room_images = await prisma.room_images.upsert({
     *   create: {
     *     // ... data to create a Room_images
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Room_images we want to update
     *   }
     * })
     */
    upsert<T extends room_imagesUpsertArgs>(args: SelectSubset<T, room_imagesUpsertArgs<ExtArgs>>): Prisma__room_imagesClient<$Result.GetResult<Prisma.$room_imagesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Room_images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_imagesCountArgs} args - Arguments to filter Room_images to count.
     * @example
     * // Count the number of Room_images
     * const count = await prisma.room_images.count({
     *   where: {
     *     // ... the filter for the Room_images we want to count
     *   }
     * })
    **/
    count<T extends room_imagesCountArgs>(
      args?: Subset<T, room_imagesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Room_imagesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Room_images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Room_imagesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Room_imagesAggregateArgs>(args: Subset<T, Room_imagesAggregateArgs>): Prisma.PrismaPromise<GetRoom_imagesAggregateType<T>>

    /**
     * Group by Room_images.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_imagesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends room_imagesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: room_imagesGroupByArgs['orderBy'] }
        : { orderBy?: room_imagesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, room_imagesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoom_imagesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the room_images model
   */
  readonly fields: room_imagesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for room_images.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__room_imagesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    room<T extends roomsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, roomsDefaultArgs<ExtArgs>>): Prisma__roomsClient<$Result.GetResult<Prisma.$roomsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the room_images model
   */
  interface room_imagesFieldRefs {
    readonly id: FieldRef<"room_images", 'String'>
    readonly room_id: FieldRef<"room_images", 'String'>
    readonly image_url: FieldRef<"room_images", 'String'>
    readonly created_at: FieldRef<"room_images", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * room_images findUnique
   */
  export type room_imagesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_images
     */
    select?: room_imagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_images
     */
    omit?: room_imagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_imagesInclude<ExtArgs> | null
    /**
     * Filter, which room_images to fetch.
     */
    where: room_imagesWhereUniqueInput
  }

  /**
   * room_images findUniqueOrThrow
   */
  export type room_imagesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_images
     */
    select?: room_imagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_images
     */
    omit?: room_imagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_imagesInclude<ExtArgs> | null
    /**
     * Filter, which room_images to fetch.
     */
    where: room_imagesWhereUniqueInput
  }

  /**
   * room_images findFirst
   */
  export type room_imagesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_images
     */
    select?: room_imagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_images
     */
    omit?: room_imagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_imagesInclude<ExtArgs> | null
    /**
     * Filter, which room_images to fetch.
     */
    where?: room_imagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of room_images to fetch.
     */
    orderBy?: room_imagesOrderByWithRelationInput | room_imagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for room_images.
     */
    cursor?: room_imagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` room_images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` room_images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of room_images.
     */
    distinct?: Room_imagesScalarFieldEnum | Room_imagesScalarFieldEnum[]
  }

  /**
   * room_images findFirstOrThrow
   */
  export type room_imagesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_images
     */
    select?: room_imagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_images
     */
    omit?: room_imagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_imagesInclude<ExtArgs> | null
    /**
     * Filter, which room_images to fetch.
     */
    where?: room_imagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of room_images to fetch.
     */
    orderBy?: room_imagesOrderByWithRelationInput | room_imagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for room_images.
     */
    cursor?: room_imagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` room_images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` room_images.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of room_images.
     */
    distinct?: Room_imagesScalarFieldEnum | Room_imagesScalarFieldEnum[]
  }

  /**
   * room_images findMany
   */
  export type room_imagesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_images
     */
    select?: room_imagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_images
     */
    omit?: room_imagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_imagesInclude<ExtArgs> | null
    /**
     * Filter, which room_images to fetch.
     */
    where?: room_imagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of room_images to fetch.
     */
    orderBy?: room_imagesOrderByWithRelationInput | room_imagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing room_images.
     */
    cursor?: room_imagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` room_images from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` room_images.
     */
    skip?: number
    distinct?: Room_imagesScalarFieldEnum | Room_imagesScalarFieldEnum[]
  }

  /**
   * room_images create
   */
  export type room_imagesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_images
     */
    select?: room_imagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_images
     */
    omit?: room_imagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_imagesInclude<ExtArgs> | null
    /**
     * The data needed to create a room_images.
     */
    data: XOR<room_imagesCreateInput, room_imagesUncheckedCreateInput>
  }

  /**
   * room_images createMany
   */
  export type room_imagesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many room_images.
     */
    data: room_imagesCreateManyInput | room_imagesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * room_images createManyAndReturn
   */
  export type room_imagesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_images
     */
    select?: room_imagesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the room_images
     */
    omit?: room_imagesOmit<ExtArgs> | null
    /**
     * The data used to create many room_images.
     */
    data: room_imagesCreateManyInput | room_imagesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_imagesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * room_images update
   */
  export type room_imagesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_images
     */
    select?: room_imagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_images
     */
    omit?: room_imagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_imagesInclude<ExtArgs> | null
    /**
     * The data needed to update a room_images.
     */
    data: XOR<room_imagesUpdateInput, room_imagesUncheckedUpdateInput>
    /**
     * Choose, which room_images to update.
     */
    where: room_imagesWhereUniqueInput
  }

  /**
   * room_images updateMany
   */
  export type room_imagesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update room_images.
     */
    data: XOR<room_imagesUpdateManyMutationInput, room_imagesUncheckedUpdateManyInput>
    /**
     * Filter which room_images to update
     */
    where?: room_imagesWhereInput
    /**
     * Limit how many room_images to update.
     */
    limit?: number
  }

  /**
   * room_images updateManyAndReturn
   */
  export type room_imagesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_images
     */
    select?: room_imagesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the room_images
     */
    omit?: room_imagesOmit<ExtArgs> | null
    /**
     * The data used to update room_images.
     */
    data: XOR<room_imagesUpdateManyMutationInput, room_imagesUncheckedUpdateManyInput>
    /**
     * Filter which room_images to update
     */
    where?: room_imagesWhereInput
    /**
     * Limit how many room_images to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_imagesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * room_images upsert
   */
  export type room_imagesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_images
     */
    select?: room_imagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_images
     */
    omit?: room_imagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_imagesInclude<ExtArgs> | null
    /**
     * The filter to search for the room_images to update in case it exists.
     */
    where: room_imagesWhereUniqueInput
    /**
     * In case the room_images found by the `where` argument doesn't exist, create a new room_images with this data.
     */
    create: XOR<room_imagesCreateInput, room_imagesUncheckedCreateInput>
    /**
     * In case the room_images was found with the provided `where` argument, update it with this data.
     */
    update: XOR<room_imagesUpdateInput, room_imagesUncheckedUpdateInput>
  }

  /**
   * room_images delete
   */
  export type room_imagesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_images
     */
    select?: room_imagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_images
     */
    omit?: room_imagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_imagesInclude<ExtArgs> | null
    /**
     * Filter which room_images to delete.
     */
    where: room_imagesWhereUniqueInput
  }

  /**
   * room_images deleteMany
   */
  export type room_imagesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which room_images to delete
     */
    where?: room_imagesWhereInput
    /**
     * Limit how many room_images to delete.
     */
    limit?: number
  }

  /**
   * room_images without action
   */
  export type room_imagesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_images
     */
    select?: room_imagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_images
     */
    omit?: room_imagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_imagesInclude<ExtArgs> | null
  }


  /**
   * Model room_availability
   */

  export type AggregateRoom_availability = {
    _count: Room_availabilityCountAggregateOutputType | null
    _avg: Room_availabilityAvgAggregateOutputType | null
    _sum: Room_availabilitySumAggregateOutputType | null
    _min: Room_availabilityMinAggregateOutputType | null
    _max: Room_availabilityMaxAggregateOutputType | null
  }

  export type Room_availabilityAvgAggregateOutputType = {
    price_override: Decimal | null
  }

  export type Room_availabilitySumAggregateOutputType = {
    price_override: Decimal | null
  }

  export type Room_availabilityMinAggregateOutputType = {
    id: string | null
    room_id: string | null
    date: Date | null
    is_available: boolean | null
    price_override: Decimal | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Room_availabilityMaxAggregateOutputType = {
    id: string | null
    room_id: string | null
    date: Date | null
    is_available: boolean | null
    price_override: Decimal | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Room_availabilityCountAggregateOutputType = {
    id: number
    room_id: number
    date: number
    is_available: number
    price_override: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Room_availabilityAvgAggregateInputType = {
    price_override?: true
  }

  export type Room_availabilitySumAggregateInputType = {
    price_override?: true
  }

  export type Room_availabilityMinAggregateInputType = {
    id?: true
    room_id?: true
    date?: true
    is_available?: true
    price_override?: true
    created_at?: true
    updated_at?: true
  }

  export type Room_availabilityMaxAggregateInputType = {
    id?: true
    room_id?: true
    date?: true
    is_available?: true
    price_override?: true
    created_at?: true
    updated_at?: true
  }

  export type Room_availabilityCountAggregateInputType = {
    id?: true
    room_id?: true
    date?: true
    is_available?: true
    price_override?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Room_availabilityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which room_availability to aggregate.
     */
    where?: room_availabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of room_availabilities to fetch.
     */
    orderBy?: room_availabilityOrderByWithRelationInput | room_availabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: room_availabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` room_availabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` room_availabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned room_availabilities
    **/
    _count?: true | Room_availabilityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Room_availabilityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Room_availabilitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Room_availabilityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Room_availabilityMaxAggregateInputType
  }

  export type GetRoom_availabilityAggregateType<T extends Room_availabilityAggregateArgs> = {
        [P in keyof T & keyof AggregateRoom_availability]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoom_availability[P]>
      : GetScalarType<T[P], AggregateRoom_availability[P]>
  }




  export type room_availabilityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: room_availabilityWhereInput
    orderBy?: room_availabilityOrderByWithAggregationInput | room_availabilityOrderByWithAggregationInput[]
    by: Room_availabilityScalarFieldEnum[] | Room_availabilityScalarFieldEnum
    having?: room_availabilityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Room_availabilityCountAggregateInputType | true
    _avg?: Room_availabilityAvgAggregateInputType
    _sum?: Room_availabilitySumAggregateInputType
    _min?: Room_availabilityMinAggregateInputType
    _max?: Room_availabilityMaxAggregateInputType
  }

  export type Room_availabilityGroupByOutputType = {
    id: string
    room_id: string
    date: Date
    is_available: boolean
    price_override: Decimal | null
    created_at: Date
    updated_at: Date
    _count: Room_availabilityCountAggregateOutputType | null
    _avg: Room_availabilityAvgAggregateOutputType | null
    _sum: Room_availabilitySumAggregateOutputType | null
    _min: Room_availabilityMinAggregateOutputType | null
    _max: Room_availabilityMaxAggregateOutputType | null
  }

  type GetRoom_availabilityGroupByPayload<T extends room_availabilityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Room_availabilityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Room_availabilityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Room_availabilityGroupByOutputType[P]>
            : GetScalarType<T[P], Room_availabilityGroupByOutputType[P]>
        }
      >
    >


  export type room_availabilitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_id?: boolean
    date?: boolean
    is_available?: boolean
    price_override?: boolean
    created_at?: boolean
    updated_at?: boolean
    room?: boolean | roomsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room_availability"]>

  export type room_availabilitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_id?: boolean
    date?: boolean
    is_available?: boolean
    price_override?: boolean
    created_at?: boolean
    updated_at?: boolean
    room?: boolean | roomsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room_availability"]>

  export type room_availabilitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_id?: boolean
    date?: boolean
    is_available?: boolean
    price_override?: boolean
    created_at?: boolean
    updated_at?: boolean
    room?: boolean | roomsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room_availability"]>

  export type room_availabilitySelectScalar = {
    id?: boolean
    room_id?: boolean
    date?: boolean
    is_available?: boolean
    price_override?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type room_availabilityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "room_id" | "date" | "is_available" | "price_override" | "created_at" | "updated_at", ExtArgs["result"]["room_availability"]>
  export type room_availabilityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | roomsDefaultArgs<ExtArgs>
  }
  export type room_availabilityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | roomsDefaultArgs<ExtArgs>
  }
  export type room_availabilityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | roomsDefaultArgs<ExtArgs>
  }

  export type $room_availabilityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "room_availability"
    objects: {
      room: Prisma.$roomsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      room_id: string
      date: Date
      is_available: boolean
      price_override: Prisma.Decimal | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["room_availability"]>
    composites: {}
  }

  type room_availabilityGetPayload<S extends boolean | null | undefined | room_availabilityDefaultArgs> = $Result.GetResult<Prisma.$room_availabilityPayload, S>

  type room_availabilityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<room_availabilityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Room_availabilityCountAggregateInputType | true
    }

  export interface room_availabilityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['room_availability'], meta: { name: 'room_availability' } }
    /**
     * Find zero or one Room_availability that matches the filter.
     * @param {room_availabilityFindUniqueArgs} args - Arguments to find a Room_availability
     * @example
     * // Get one Room_availability
     * const room_availability = await prisma.room_availability.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends room_availabilityFindUniqueArgs>(args: SelectSubset<T, room_availabilityFindUniqueArgs<ExtArgs>>): Prisma__room_availabilityClient<$Result.GetResult<Prisma.$room_availabilityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Room_availability that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {room_availabilityFindUniqueOrThrowArgs} args - Arguments to find a Room_availability
     * @example
     * // Get one Room_availability
     * const room_availability = await prisma.room_availability.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends room_availabilityFindUniqueOrThrowArgs>(args: SelectSubset<T, room_availabilityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__room_availabilityClient<$Result.GetResult<Prisma.$room_availabilityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room_availability that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_availabilityFindFirstArgs} args - Arguments to find a Room_availability
     * @example
     * // Get one Room_availability
     * const room_availability = await prisma.room_availability.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends room_availabilityFindFirstArgs>(args?: SelectSubset<T, room_availabilityFindFirstArgs<ExtArgs>>): Prisma__room_availabilityClient<$Result.GetResult<Prisma.$room_availabilityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room_availability that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_availabilityFindFirstOrThrowArgs} args - Arguments to find a Room_availability
     * @example
     * // Get one Room_availability
     * const room_availability = await prisma.room_availability.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends room_availabilityFindFirstOrThrowArgs>(args?: SelectSubset<T, room_availabilityFindFirstOrThrowArgs<ExtArgs>>): Prisma__room_availabilityClient<$Result.GetResult<Prisma.$room_availabilityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Room_availabilities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_availabilityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Room_availabilities
     * const room_availabilities = await prisma.room_availability.findMany()
     * 
     * // Get first 10 Room_availabilities
     * const room_availabilities = await prisma.room_availability.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const room_availabilityWithIdOnly = await prisma.room_availability.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends room_availabilityFindManyArgs>(args?: SelectSubset<T, room_availabilityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$room_availabilityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Room_availability.
     * @param {room_availabilityCreateArgs} args - Arguments to create a Room_availability.
     * @example
     * // Create one Room_availability
     * const Room_availability = await prisma.room_availability.create({
     *   data: {
     *     // ... data to create a Room_availability
     *   }
     * })
     * 
     */
    create<T extends room_availabilityCreateArgs>(args: SelectSubset<T, room_availabilityCreateArgs<ExtArgs>>): Prisma__room_availabilityClient<$Result.GetResult<Prisma.$room_availabilityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Room_availabilities.
     * @param {room_availabilityCreateManyArgs} args - Arguments to create many Room_availabilities.
     * @example
     * // Create many Room_availabilities
     * const room_availability = await prisma.room_availability.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends room_availabilityCreateManyArgs>(args?: SelectSubset<T, room_availabilityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Room_availabilities and returns the data saved in the database.
     * @param {room_availabilityCreateManyAndReturnArgs} args - Arguments to create many Room_availabilities.
     * @example
     * // Create many Room_availabilities
     * const room_availability = await prisma.room_availability.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Room_availabilities and only return the `id`
     * const room_availabilityWithIdOnly = await prisma.room_availability.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends room_availabilityCreateManyAndReturnArgs>(args?: SelectSubset<T, room_availabilityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$room_availabilityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Room_availability.
     * @param {room_availabilityDeleteArgs} args - Arguments to delete one Room_availability.
     * @example
     * // Delete one Room_availability
     * const Room_availability = await prisma.room_availability.delete({
     *   where: {
     *     // ... filter to delete one Room_availability
     *   }
     * })
     * 
     */
    delete<T extends room_availabilityDeleteArgs>(args: SelectSubset<T, room_availabilityDeleteArgs<ExtArgs>>): Prisma__room_availabilityClient<$Result.GetResult<Prisma.$room_availabilityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Room_availability.
     * @param {room_availabilityUpdateArgs} args - Arguments to update one Room_availability.
     * @example
     * // Update one Room_availability
     * const room_availability = await prisma.room_availability.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends room_availabilityUpdateArgs>(args: SelectSubset<T, room_availabilityUpdateArgs<ExtArgs>>): Prisma__room_availabilityClient<$Result.GetResult<Prisma.$room_availabilityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Room_availabilities.
     * @param {room_availabilityDeleteManyArgs} args - Arguments to filter Room_availabilities to delete.
     * @example
     * // Delete a few Room_availabilities
     * const { count } = await prisma.room_availability.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends room_availabilityDeleteManyArgs>(args?: SelectSubset<T, room_availabilityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Room_availabilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_availabilityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Room_availabilities
     * const room_availability = await prisma.room_availability.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends room_availabilityUpdateManyArgs>(args: SelectSubset<T, room_availabilityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Room_availabilities and returns the data updated in the database.
     * @param {room_availabilityUpdateManyAndReturnArgs} args - Arguments to update many Room_availabilities.
     * @example
     * // Update many Room_availabilities
     * const room_availability = await prisma.room_availability.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Room_availabilities and only return the `id`
     * const room_availabilityWithIdOnly = await prisma.room_availability.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends room_availabilityUpdateManyAndReturnArgs>(args: SelectSubset<T, room_availabilityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$room_availabilityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Room_availability.
     * @param {room_availabilityUpsertArgs} args - Arguments to update or create a Room_availability.
     * @example
     * // Update or create a Room_availability
     * const room_availability = await prisma.room_availability.upsert({
     *   create: {
     *     // ... data to create a Room_availability
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Room_availability we want to update
     *   }
     * })
     */
    upsert<T extends room_availabilityUpsertArgs>(args: SelectSubset<T, room_availabilityUpsertArgs<ExtArgs>>): Prisma__room_availabilityClient<$Result.GetResult<Prisma.$room_availabilityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Room_availabilities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_availabilityCountArgs} args - Arguments to filter Room_availabilities to count.
     * @example
     * // Count the number of Room_availabilities
     * const count = await prisma.room_availability.count({
     *   where: {
     *     // ... the filter for the Room_availabilities we want to count
     *   }
     * })
    **/
    count<T extends room_availabilityCountArgs>(
      args?: Subset<T, room_availabilityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Room_availabilityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Room_availability.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Room_availabilityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Room_availabilityAggregateArgs>(args: Subset<T, Room_availabilityAggregateArgs>): Prisma.PrismaPromise<GetRoom_availabilityAggregateType<T>>

    /**
     * Group by Room_availability.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_availabilityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends room_availabilityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: room_availabilityGroupByArgs['orderBy'] }
        : { orderBy?: room_availabilityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, room_availabilityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoom_availabilityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the room_availability model
   */
  readonly fields: room_availabilityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for room_availability.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__room_availabilityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    room<T extends roomsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, roomsDefaultArgs<ExtArgs>>): Prisma__roomsClient<$Result.GetResult<Prisma.$roomsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the room_availability model
   */
  interface room_availabilityFieldRefs {
    readonly id: FieldRef<"room_availability", 'String'>
    readonly room_id: FieldRef<"room_availability", 'String'>
    readonly date: FieldRef<"room_availability", 'DateTime'>
    readonly is_available: FieldRef<"room_availability", 'Boolean'>
    readonly price_override: FieldRef<"room_availability", 'Decimal'>
    readonly created_at: FieldRef<"room_availability", 'DateTime'>
    readonly updated_at: FieldRef<"room_availability", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * room_availability findUnique
   */
  export type room_availabilityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_availability
     */
    select?: room_availabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_availability
     */
    omit?: room_availabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_availabilityInclude<ExtArgs> | null
    /**
     * Filter, which room_availability to fetch.
     */
    where: room_availabilityWhereUniqueInput
  }

  /**
   * room_availability findUniqueOrThrow
   */
  export type room_availabilityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_availability
     */
    select?: room_availabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_availability
     */
    omit?: room_availabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_availabilityInclude<ExtArgs> | null
    /**
     * Filter, which room_availability to fetch.
     */
    where: room_availabilityWhereUniqueInput
  }

  /**
   * room_availability findFirst
   */
  export type room_availabilityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_availability
     */
    select?: room_availabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_availability
     */
    omit?: room_availabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_availabilityInclude<ExtArgs> | null
    /**
     * Filter, which room_availability to fetch.
     */
    where?: room_availabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of room_availabilities to fetch.
     */
    orderBy?: room_availabilityOrderByWithRelationInput | room_availabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for room_availabilities.
     */
    cursor?: room_availabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` room_availabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` room_availabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of room_availabilities.
     */
    distinct?: Room_availabilityScalarFieldEnum | Room_availabilityScalarFieldEnum[]
  }

  /**
   * room_availability findFirstOrThrow
   */
  export type room_availabilityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_availability
     */
    select?: room_availabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_availability
     */
    omit?: room_availabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_availabilityInclude<ExtArgs> | null
    /**
     * Filter, which room_availability to fetch.
     */
    where?: room_availabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of room_availabilities to fetch.
     */
    orderBy?: room_availabilityOrderByWithRelationInput | room_availabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for room_availabilities.
     */
    cursor?: room_availabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` room_availabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` room_availabilities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of room_availabilities.
     */
    distinct?: Room_availabilityScalarFieldEnum | Room_availabilityScalarFieldEnum[]
  }

  /**
   * room_availability findMany
   */
  export type room_availabilityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_availability
     */
    select?: room_availabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_availability
     */
    omit?: room_availabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_availabilityInclude<ExtArgs> | null
    /**
     * Filter, which room_availabilities to fetch.
     */
    where?: room_availabilityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of room_availabilities to fetch.
     */
    orderBy?: room_availabilityOrderByWithRelationInput | room_availabilityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing room_availabilities.
     */
    cursor?: room_availabilityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` room_availabilities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` room_availabilities.
     */
    skip?: number
    distinct?: Room_availabilityScalarFieldEnum | Room_availabilityScalarFieldEnum[]
  }

  /**
   * room_availability create
   */
  export type room_availabilityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_availability
     */
    select?: room_availabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_availability
     */
    omit?: room_availabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_availabilityInclude<ExtArgs> | null
    /**
     * The data needed to create a room_availability.
     */
    data: XOR<room_availabilityCreateInput, room_availabilityUncheckedCreateInput>
  }

  /**
   * room_availability createMany
   */
  export type room_availabilityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many room_availabilities.
     */
    data: room_availabilityCreateManyInput | room_availabilityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * room_availability createManyAndReturn
   */
  export type room_availabilityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_availability
     */
    select?: room_availabilitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the room_availability
     */
    omit?: room_availabilityOmit<ExtArgs> | null
    /**
     * The data used to create many room_availabilities.
     */
    data: room_availabilityCreateManyInput | room_availabilityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_availabilityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * room_availability update
   */
  export type room_availabilityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_availability
     */
    select?: room_availabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_availability
     */
    omit?: room_availabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_availabilityInclude<ExtArgs> | null
    /**
     * The data needed to update a room_availability.
     */
    data: XOR<room_availabilityUpdateInput, room_availabilityUncheckedUpdateInput>
    /**
     * Choose, which room_availability to update.
     */
    where: room_availabilityWhereUniqueInput
  }

  /**
   * room_availability updateMany
   */
  export type room_availabilityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update room_availabilities.
     */
    data: XOR<room_availabilityUpdateManyMutationInput, room_availabilityUncheckedUpdateManyInput>
    /**
     * Filter which room_availabilities to update
     */
    where?: room_availabilityWhereInput
    /**
     * Limit how many room_availabilities to update.
     */
    limit?: number
  }

  /**
   * room_availability updateManyAndReturn
   */
  export type room_availabilityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_availability
     */
    select?: room_availabilitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the room_availability
     */
    omit?: room_availabilityOmit<ExtArgs> | null
    /**
     * The data used to update room_availabilities.
     */
    data: XOR<room_availabilityUpdateManyMutationInput, room_availabilityUncheckedUpdateManyInput>
    /**
     * Filter which room_availabilities to update
     */
    where?: room_availabilityWhereInput
    /**
     * Limit how many room_availabilities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_availabilityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * room_availability upsert
   */
  export type room_availabilityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_availability
     */
    select?: room_availabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_availability
     */
    omit?: room_availabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_availabilityInclude<ExtArgs> | null
    /**
     * The filter to search for the room_availability to update in case it exists.
     */
    where: room_availabilityWhereUniqueInput
    /**
     * In case the room_availability found by the `where` argument doesn't exist, create a new room_availability with this data.
     */
    create: XOR<room_availabilityCreateInput, room_availabilityUncheckedCreateInput>
    /**
     * In case the room_availability was found with the provided `where` argument, update it with this data.
     */
    update: XOR<room_availabilityUpdateInput, room_availabilityUncheckedUpdateInput>
  }

  /**
   * room_availability delete
   */
  export type room_availabilityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_availability
     */
    select?: room_availabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_availability
     */
    omit?: room_availabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_availabilityInclude<ExtArgs> | null
    /**
     * Filter which room_availability to delete.
     */
    where: room_availabilityWhereUniqueInput
  }

  /**
   * room_availability deleteMany
   */
  export type room_availabilityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which room_availabilities to delete
     */
    where?: room_availabilityWhereInput
    /**
     * Limit how many room_availabilities to delete.
     */
    limit?: number
  }

  /**
   * room_availability without action
   */
  export type room_availabilityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_availability
     */
    select?: room_availabilitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_availability
     */
    omit?: room_availabilityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_availabilityInclude<ExtArgs> | null
  }


  /**
   * Model peak_season_rates
   */

  export type AggregatePeak_season_rates = {
    _count: Peak_season_ratesCountAggregateOutputType | null
    _avg: Peak_season_ratesAvgAggregateOutputType | null
    _sum: Peak_season_ratesSumAggregateOutputType | null
    _min: Peak_season_ratesMinAggregateOutputType | null
    _max: Peak_season_ratesMaxAggregateOutputType | null
  }

  export type Peak_season_ratesAvgAggregateOutputType = {
    price_change_value: Decimal | null
  }

  export type Peak_season_ratesSumAggregateOutputType = {
    price_change_value: Decimal | null
  }

  export type Peak_season_ratesMinAggregateOutputType = {
    id: string | null
    property_id: string | null
    room_id: string | null
    start_date: Date | null
    end_date: Date | null
    price_change_type: $Enums.PriceChangeType | null
    price_change_value: Decimal | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Peak_season_ratesMaxAggregateOutputType = {
    id: string | null
    property_id: string | null
    room_id: string | null
    start_date: Date | null
    end_date: Date | null
    price_change_type: $Enums.PriceChangeType | null
    price_change_value: Decimal | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Peak_season_ratesCountAggregateOutputType = {
    id: number
    property_id: number
    room_id: number
    start_date: number
    end_date: number
    price_change_type: number
    price_change_value: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Peak_season_ratesAvgAggregateInputType = {
    price_change_value?: true
  }

  export type Peak_season_ratesSumAggregateInputType = {
    price_change_value?: true
  }

  export type Peak_season_ratesMinAggregateInputType = {
    id?: true
    property_id?: true
    room_id?: true
    start_date?: true
    end_date?: true
    price_change_type?: true
    price_change_value?: true
    created_at?: true
    updated_at?: true
  }

  export type Peak_season_ratesMaxAggregateInputType = {
    id?: true
    property_id?: true
    room_id?: true
    start_date?: true
    end_date?: true
    price_change_type?: true
    price_change_value?: true
    created_at?: true
    updated_at?: true
  }

  export type Peak_season_ratesCountAggregateInputType = {
    id?: true
    property_id?: true
    room_id?: true
    start_date?: true
    end_date?: true
    price_change_type?: true
    price_change_value?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Peak_season_ratesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which peak_season_rates to aggregate.
     */
    where?: peak_season_ratesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of peak_season_rates to fetch.
     */
    orderBy?: peak_season_ratesOrderByWithRelationInput | peak_season_ratesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: peak_season_ratesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` peak_season_rates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` peak_season_rates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned peak_season_rates
    **/
    _count?: true | Peak_season_ratesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Peak_season_ratesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Peak_season_ratesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Peak_season_ratesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Peak_season_ratesMaxAggregateInputType
  }

  export type GetPeak_season_ratesAggregateType<T extends Peak_season_ratesAggregateArgs> = {
        [P in keyof T & keyof AggregatePeak_season_rates]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePeak_season_rates[P]>
      : GetScalarType<T[P], AggregatePeak_season_rates[P]>
  }




  export type peak_season_ratesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: peak_season_ratesWhereInput
    orderBy?: peak_season_ratesOrderByWithAggregationInput | peak_season_ratesOrderByWithAggregationInput[]
    by: Peak_season_ratesScalarFieldEnum[] | Peak_season_ratesScalarFieldEnum
    having?: peak_season_ratesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Peak_season_ratesCountAggregateInputType | true
    _avg?: Peak_season_ratesAvgAggregateInputType
    _sum?: Peak_season_ratesSumAggregateInputType
    _min?: Peak_season_ratesMinAggregateInputType
    _max?: Peak_season_ratesMaxAggregateInputType
  }

  export type Peak_season_ratesGroupByOutputType = {
    id: string
    property_id: string
    room_id: string
    start_date: Date
    end_date: Date
    price_change_type: $Enums.PriceChangeType
    price_change_value: Decimal
    created_at: Date
    updated_at: Date
    _count: Peak_season_ratesCountAggregateOutputType | null
    _avg: Peak_season_ratesAvgAggregateOutputType | null
    _sum: Peak_season_ratesSumAggregateOutputType | null
    _min: Peak_season_ratesMinAggregateOutputType | null
    _max: Peak_season_ratesMaxAggregateOutputType | null
  }

  type GetPeak_season_ratesGroupByPayload<T extends peak_season_ratesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Peak_season_ratesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Peak_season_ratesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Peak_season_ratesGroupByOutputType[P]>
            : GetScalarType<T[P], Peak_season_ratesGroupByOutputType[P]>
        }
      >
    >


  export type peak_season_ratesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    property_id?: boolean
    room_id?: boolean
    start_date?: boolean
    end_date?: boolean
    price_change_type?: boolean
    price_change_value?: boolean
    created_at?: boolean
    updated_at?: boolean
    property?: boolean | propertiesDefaultArgs<ExtArgs>
    room?: boolean | roomsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["peak_season_rates"]>

  export type peak_season_ratesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    property_id?: boolean
    room_id?: boolean
    start_date?: boolean
    end_date?: boolean
    price_change_type?: boolean
    price_change_value?: boolean
    created_at?: boolean
    updated_at?: boolean
    property?: boolean | propertiesDefaultArgs<ExtArgs>
    room?: boolean | roomsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["peak_season_rates"]>

  export type peak_season_ratesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    property_id?: boolean
    room_id?: boolean
    start_date?: boolean
    end_date?: boolean
    price_change_type?: boolean
    price_change_value?: boolean
    created_at?: boolean
    updated_at?: boolean
    property?: boolean | propertiesDefaultArgs<ExtArgs>
    room?: boolean | roomsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["peak_season_rates"]>

  export type peak_season_ratesSelectScalar = {
    id?: boolean
    property_id?: boolean
    room_id?: boolean
    start_date?: boolean
    end_date?: boolean
    price_change_type?: boolean
    price_change_value?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type peak_season_ratesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "property_id" | "room_id" | "start_date" | "end_date" | "price_change_type" | "price_change_value" | "created_at" | "updated_at", ExtArgs["result"]["peak_season_rates"]>
  export type peak_season_ratesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | propertiesDefaultArgs<ExtArgs>
    room?: boolean | roomsDefaultArgs<ExtArgs>
  }
  export type peak_season_ratesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | propertiesDefaultArgs<ExtArgs>
    room?: boolean | roomsDefaultArgs<ExtArgs>
  }
  export type peak_season_ratesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | propertiesDefaultArgs<ExtArgs>
    room?: boolean | roomsDefaultArgs<ExtArgs>
  }

  export type $peak_season_ratesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "peak_season_rates"
    objects: {
      property: Prisma.$propertiesPayload<ExtArgs>
      room: Prisma.$roomsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      property_id: string
      room_id: string
      start_date: Date
      end_date: Date
      price_change_type: $Enums.PriceChangeType
      price_change_value: Prisma.Decimal
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["peak_season_rates"]>
    composites: {}
  }

  type peak_season_ratesGetPayload<S extends boolean | null | undefined | peak_season_ratesDefaultArgs> = $Result.GetResult<Prisma.$peak_season_ratesPayload, S>

  type peak_season_ratesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<peak_season_ratesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Peak_season_ratesCountAggregateInputType | true
    }

  export interface peak_season_ratesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['peak_season_rates'], meta: { name: 'peak_season_rates' } }
    /**
     * Find zero or one Peak_season_rates that matches the filter.
     * @param {peak_season_ratesFindUniqueArgs} args - Arguments to find a Peak_season_rates
     * @example
     * // Get one Peak_season_rates
     * const peak_season_rates = await prisma.peak_season_rates.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends peak_season_ratesFindUniqueArgs>(args: SelectSubset<T, peak_season_ratesFindUniqueArgs<ExtArgs>>): Prisma__peak_season_ratesClient<$Result.GetResult<Prisma.$peak_season_ratesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Peak_season_rates that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {peak_season_ratesFindUniqueOrThrowArgs} args - Arguments to find a Peak_season_rates
     * @example
     * // Get one Peak_season_rates
     * const peak_season_rates = await prisma.peak_season_rates.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends peak_season_ratesFindUniqueOrThrowArgs>(args: SelectSubset<T, peak_season_ratesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__peak_season_ratesClient<$Result.GetResult<Prisma.$peak_season_ratesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Peak_season_rates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {peak_season_ratesFindFirstArgs} args - Arguments to find a Peak_season_rates
     * @example
     * // Get one Peak_season_rates
     * const peak_season_rates = await prisma.peak_season_rates.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends peak_season_ratesFindFirstArgs>(args?: SelectSubset<T, peak_season_ratesFindFirstArgs<ExtArgs>>): Prisma__peak_season_ratesClient<$Result.GetResult<Prisma.$peak_season_ratesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Peak_season_rates that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {peak_season_ratesFindFirstOrThrowArgs} args - Arguments to find a Peak_season_rates
     * @example
     * // Get one Peak_season_rates
     * const peak_season_rates = await prisma.peak_season_rates.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends peak_season_ratesFindFirstOrThrowArgs>(args?: SelectSubset<T, peak_season_ratesFindFirstOrThrowArgs<ExtArgs>>): Prisma__peak_season_ratesClient<$Result.GetResult<Prisma.$peak_season_ratesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Peak_season_rates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {peak_season_ratesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Peak_season_rates
     * const peak_season_rates = await prisma.peak_season_rates.findMany()
     * 
     * // Get first 10 Peak_season_rates
     * const peak_season_rates = await prisma.peak_season_rates.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const peak_season_ratesWithIdOnly = await prisma.peak_season_rates.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends peak_season_ratesFindManyArgs>(args?: SelectSubset<T, peak_season_ratesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$peak_season_ratesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Peak_season_rates.
     * @param {peak_season_ratesCreateArgs} args - Arguments to create a Peak_season_rates.
     * @example
     * // Create one Peak_season_rates
     * const Peak_season_rates = await prisma.peak_season_rates.create({
     *   data: {
     *     // ... data to create a Peak_season_rates
     *   }
     * })
     * 
     */
    create<T extends peak_season_ratesCreateArgs>(args: SelectSubset<T, peak_season_ratesCreateArgs<ExtArgs>>): Prisma__peak_season_ratesClient<$Result.GetResult<Prisma.$peak_season_ratesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Peak_season_rates.
     * @param {peak_season_ratesCreateManyArgs} args - Arguments to create many Peak_season_rates.
     * @example
     * // Create many Peak_season_rates
     * const peak_season_rates = await prisma.peak_season_rates.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends peak_season_ratesCreateManyArgs>(args?: SelectSubset<T, peak_season_ratesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Peak_season_rates and returns the data saved in the database.
     * @param {peak_season_ratesCreateManyAndReturnArgs} args - Arguments to create many Peak_season_rates.
     * @example
     * // Create many Peak_season_rates
     * const peak_season_rates = await prisma.peak_season_rates.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Peak_season_rates and only return the `id`
     * const peak_season_ratesWithIdOnly = await prisma.peak_season_rates.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends peak_season_ratesCreateManyAndReturnArgs>(args?: SelectSubset<T, peak_season_ratesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$peak_season_ratesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Peak_season_rates.
     * @param {peak_season_ratesDeleteArgs} args - Arguments to delete one Peak_season_rates.
     * @example
     * // Delete one Peak_season_rates
     * const Peak_season_rates = await prisma.peak_season_rates.delete({
     *   where: {
     *     // ... filter to delete one Peak_season_rates
     *   }
     * })
     * 
     */
    delete<T extends peak_season_ratesDeleteArgs>(args: SelectSubset<T, peak_season_ratesDeleteArgs<ExtArgs>>): Prisma__peak_season_ratesClient<$Result.GetResult<Prisma.$peak_season_ratesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Peak_season_rates.
     * @param {peak_season_ratesUpdateArgs} args - Arguments to update one Peak_season_rates.
     * @example
     * // Update one Peak_season_rates
     * const peak_season_rates = await prisma.peak_season_rates.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends peak_season_ratesUpdateArgs>(args: SelectSubset<T, peak_season_ratesUpdateArgs<ExtArgs>>): Prisma__peak_season_ratesClient<$Result.GetResult<Prisma.$peak_season_ratesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Peak_season_rates.
     * @param {peak_season_ratesDeleteManyArgs} args - Arguments to filter Peak_season_rates to delete.
     * @example
     * // Delete a few Peak_season_rates
     * const { count } = await prisma.peak_season_rates.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends peak_season_ratesDeleteManyArgs>(args?: SelectSubset<T, peak_season_ratesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Peak_season_rates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {peak_season_ratesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Peak_season_rates
     * const peak_season_rates = await prisma.peak_season_rates.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends peak_season_ratesUpdateManyArgs>(args: SelectSubset<T, peak_season_ratesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Peak_season_rates and returns the data updated in the database.
     * @param {peak_season_ratesUpdateManyAndReturnArgs} args - Arguments to update many Peak_season_rates.
     * @example
     * // Update many Peak_season_rates
     * const peak_season_rates = await prisma.peak_season_rates.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Peak_season_rates and only return the `id`
     * const peak_season_ratesWithIdOnly = await prisma.peak_season_rates.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends peak_season_ratesUpdateManyAndReturnArgs>(args: SelectSubset<T, peak_season_ratesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$peak_season_ratesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Peak_season_rates.
     * @param {peak_season_ratesUpsertArgs} args - Arguments to update or create a Peak_season_rates.
     * @example
     * // Update or create a Peak_season_rates
     * const peak_season_rates = await prisma.peak_season_rates.upsert({
     *   create: {
     *     // ... data to create a Peak_season_rates
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Peak_season_rates we want to update
     *   }
     * })
     */
    upsert<T extends peak_season_ratesUpsertArgs>(args: SelectSubset<T, peak_season_ratesUpsertArgs<ExtArgs>>): Prisma__peak_season_ratesClient<$Result.GetResult<Prisma.$peak_season_ratesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Peak_season_rates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {peak_season_ratesCountArgs} args - Arguments to filter Peak_season_rates to count.
     * @example
     * // Count the number of Peak_season_rates
     * const count = await prisma.peak_season_rates.count({
     *   where: {
     *     // ... the filter for the Peak_season_rates we want to count
     *   }
     * })
    **/
    count<T extends peak_season_ratesCountArgs>(
      args?: Subset<T, peak_season_ratesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Peak_season_ratesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Peak_season_rates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Peak_season_ratesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Peak_season_ratesAggregateArgs>(args: Subset<T, Peak_season_ratesAggregateArgs>): Prisma.PrismaPromise<GetPeak_season_ratesAggregateType<T>>

    /**
     * Group by Peak_season_rates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {peak_season_ratesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends peak_season_ratesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: peak_season_ratesGroupByArgs['orderBy'] }
        : { orderBy?: peak_season_ratesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, peak_season_ratesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPeak_season_ratesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the peak_season_rates model
   */
  readonly fields: peak_season_ratesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for peak_season_rates.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__peak_season_ratesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    property<T extends propertiesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, propertiesDefaultArgs<ExtArgs>>): Prisma__propertiesClient<$Result.GetResult<Prisma.$propertiesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    room<T extends roomsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, roomsDefaultArgs<ExtArgs>>): Prisma__roomsClient<$Result.GetResult<Prisma.$roomsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the peak_season_rates model
   */
  interface peak_season_ratesFieldRefs {
    readonly id: FieldRef<"peak_season_rates", 'String'>
    readonly property_id: FieldRef<"peak_season_rates", 'String'>
    readonly room_id: FieldRef<"peak_season_rates", 'String'>
    readonly start_date: FieldRef<"peak_season_rates", 'DateTime'>
    readonly end_date: FieldRef<"peak_season_rates", 'DateTime'>
    readonly price_change_type: FieldRef<"peak_season_rates", 'PriceChangeType'>
    readonly price_change_value: FieldRef<"peak_season_rates", 'Decimal'>
    readonly created_at: FieldRef<"peak_season_rates", 'DateTime'>
    readonly updated_at: FieldRef<"peak_season_rates", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * peak_season_rates findUnique
   */
  export type peak_season_ratesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the peak_season_rates
     */
    select?: peak_season_ratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the peak_season_rates
     */
    omit?: peak_season_ratesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: peak_season_ratesInclude<ExtArgs> | null
    /**
     * Filter, which peak_season_rates to fetch.
     */
    where: peak_season_ratesWhereUniqueInput
  }

  /**
   * peak_season_rates findUniqueOrThrow
   */
  export type peak_season_ratesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the peak_season_rates
     */
    select?: peak_season_ratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the peak_season_rates
     */
    omit?: peak_season_ratesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: peak_season_ratesInclude<ExtArgs> | null
    /**
     * Filter, which peak_season_rates to fetch.
     */
    where: peak_season_ratesWhereUniqueInput
  }

  /**
   * peak_season_rates findFirst
   */
  export type peak_season_ratesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the peak_season_rates
     */
    select?: peak_season_ratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the peak_season_rates
     */
    omit?: peak_season_ratesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: peak_season_ratesInclude<ExtArgs> | null
    /**
     * Filter, which peak_season_rates to fetch.
     */
    where?: peak_season_ratesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of peak_season_rates to fetch.
     */
    orderBy?: peak_season_ratesOrderByWithRelationInput | peak_season_ratesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for peak_season_rates.
     */
    cursor?: peak_season_ratesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` peak_season_rates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` peak_season_rates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of peak_season_rates.
     */
    distinct?: Peak_season_ratesScalarFieldEnum | Peak_season_ratesScalarFieldEnum[]
  }

  /**
   * peak_season_rates findFirstOrThrow
   */
  export type peak_season_ratesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the peak_season_rates
     */
    select?: peak_season_ratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the peak_season_rates
     */
    omit?: peak_season_ratesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: peak_season_ratesInclude<ExtArgs> | null
    /**
     * Filter, which peak_season_rates to fetch.
     */
    where?: peak_season_ratesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of peak_season_rates to fetch.
     */
    orderBy?: peak_season_ratesOrderByWithRelationInput | peak_season_ratesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for peak_season_rates.
     */
    cursor?: peak_season_ratesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` peak_season_rates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` peak_season_rates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of peak_season_rates.
     */
    distinct?: Peak_season_ratesScalarFieldEnum | Peak_season_ratesScalarFieldEnum[]
  }

  /**
   * peak_season_rates findMany
   */
  export type peak_season_ratesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the peak_season_rates
     */
    select?: peak_season_ratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the peak_season_rates
     */
    omit?: peak_season_ratesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: peak_season_ratesInclude<ExtArgs> | null
    /**
     * Filter, which peak_season_rates to fetch.
     */
    where?: peak_season_ratesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of peak_season_rates to fetch.
     */
    orderBy?: peak_season_ratesOrderByWithRelationInput | peak_season_ratesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing peak_season_rates.
     */
    cursor?: peak_season_ratesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` peak_season_rates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` peak_season_rates.
     */
    skip?: number
    distinct?: Peak_season_ratesScalarFieldEnum | Peak_season_ratesScalarFieldEnum[]
  }

  /**
   * peak_season_rates create
   */
  export type peak_season_ratesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the peak_season_rates
     */
    select?: peak_season_ratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the peak_season_rates
     */
    omit?: peak_season_ratesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: peak_season_ratesInclude<ExtArgs> | null
    /**
     * The data needed to create a peak_season_rates.
     */
    data: XOR<peak_season_ratesCreateInput, peak_season_ratesUncheckedCreateInput>
  }

  /**
   * peak_season_rates createMany
   */
  export type peak_season_ratesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many peak_season_rates.
     */
    data: peak_season_ratesCreateManyInput | peak_season_ratesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * peak_season_rates createManyAndReturn
   */
  export type peak_season_ratesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the peak_season_rates
     */
    select?: peak_season_ratesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the peak_season_rates
     */
    omit?: peak_season_ratesOmit<ExtArgs> | null
    /**
     * The data used to create many peak_season_rates.
     */
    data: peak_season_ratesCreateManyInput | peak_season_ratesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: peak_season_ratesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * peak_season_rates update
   */
  export type peak_season_ratesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the peak_season_rates
     */
    select?: peak_season_ratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the peak_season_rates
     */
    omit?: peak_season_ratesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: peak_season_ratesInclude<ExtArgs> | null
    /**
     * The data needed to update a peak_season_rates.
     */
    data: XOR<peak_season_ratesUpdateInput, peak_season_ratesUncheckedUpdateInput>
    /**
     * Choose, which peak_season_rates to update.
     */
    where: peak_season_ratesWhereUniqueInput
  }

  /**
   * peak_season_rates updateMany
   */
  export type peak_season_ratesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update peak_season_rates.
     */
    data: XOR<peak_season_ratesUpdateManyMutationInput, peak_season_ratesUncheckedUpdateManyInput>
    /**
     * Filter which peak_season_rates to update
     */
    where?: peak_season_ratesWhereInput
    /**
     * Limit how many peak_season_rates to update.
     */
    limit?: number
  }

  /**
   * peak_season_rates updateManyAndReturn
   */
  export type peak_season_ratesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the peak_season_rates
     */
    select?: peak_season_ratesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the peak_season_rates
     */
    omit?: peak_season_ratesOmit<ExtArgs> | null
    /**
     * The data used to update peak_season_rates.
     */
    data: XOR<peak_season_ratesUpdateManyMutationInput, peak_season_ratesUncheckedUpdateManyInput>
    /**
     * Filter which peak_season_rates to update
     */
    where?: peak_season_ratesWhereInput
    /**
     * Limit how many peak_season_rates to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: peak_season_ratesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * peak_season_rates upsert
   */
  export type peak_season_ratesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the peak_season_rates
     */
    select?: peak_season_ratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the peak_season_rates
     */
    omit?: peak_season_ratesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: peak_season_ratesInclude<ExtArgs> | null
    /**
     * The filter to search for the peak_season_rates to update in case it exists.
     */
    where: peak_season_ratesWhereUniqueInput
    /**
     * In case the peak_season_rates found by the `where` argument doesn't exist, create a new peak_season_rates with this data.
     */
    create: XOR<peak_season_ratesCreateInput, peak_season_ratesUncheckedCreateInput>
    /**
     * In case the peak_season_rates was found with the provided `where` argument, update it with this data.
     */
    update: XOR<peak_season_ratesUpdateInput, peak_season_ratesUncheckedUpdateInput>
  }

  /**
   * peak_season_rates delete
   */
  export type peak_season_ratesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the peak_season_rates
     */
    select?: peak_season_ratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the peak_season_rates
     */
    omit?: peak_season_ratesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: peak_season_ratesInclude<ExtArgs> | null
    /**
     * Filter which peak_season_rates to delete.
     */
    where: peak_season_ratesWhereUniqueInput
  }

  /**
   * peak_season_rates deleteMany
   */
  export type peak_season_ratesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which peak_season_rates to delete
     */
    where?: peak_season_ratesWhereInput
    /**
     * Limit how many peak_season_rates to delete.
     */
    limit?: number
  }

  /**
   * peak_season_rates without action
   */
  export type peak_season_ratesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the peak_season_rates
     */
    select?: peak_season_ratesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the peak_season_rates
     */
    omit?: peak_season_ratesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: peak_season_ratesInclude<ExtArgs> | null
  }


  /**
   * Model bookings
   */

  export type AggregateBookings = {
    _count: BookingsCountAggregateOutputType | null
    _avg: BookingsAvgAggregateOutputType | null
    _sum: BookingsSumAggregateOutputType | null
    _min: BookingsMinAggregateOutputType | null
    _max: BookingsMaxAggregateOutputType | null
  }

  export type BookingsAvgAggregateOutputType = {
    total_price: Decimal | null
    amount: Decimal | null
  }

  export type BookingsSumAggregateOutputType = {
    total_price: Decimal | null
    amount: Decimal | null
  }

  export type BookingsMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    property_id: string | null
    status: $Enums.BookingStatus | null
    check_in_date: Date | null
    check_out_date: Date | null
    total_price: Decimal | null
    payment_deadline: Date | null
    created_at: Date | null
    updated_at: Date | null
    amount: Decimal | null
    paid_at: Date | null
    proof_image: string | null
  }

  export type BookingsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    property_id: string | null
    status: $Enums.BookingStatus | null
    check_in_date: Date | null
    check_out_date: Date | null
    total_price: Decimal | null
    payment_deadline: Date | null
    created_at: Date | null
    updated_at: Date | null
    amount: Decimal | null
    paid_at: Date | null
    proof_image: string | null
  }

  export type BookingsCountAggregateOutputType = {
    id: number
    user_id: number
    property_id: number
    status: number
    check_in_date: number
    check_out_date: number
    total_price: number
    payment_deadline: number
    created_at: number
    updated_at: number
    amount: number
    paid_at: number
    proof_image: number
    _all: number
  }


  export type BookingsAvgAggregateInputType = {
    total_price?: true
    amount?: true
  }

  export type BookingsSumAggregateInputType = {
    total_price?: true
    amount?: true
  }

  export type BookingsMinAggregateInputType = {
    id?: true
    user_id?: true
    property_id?: true
    status?: true
    check_in_date?: true
    check_out_date?: true
    total_price?: true
    payment_deadline?: true
    created_at?: true
    updated_at?: true
    amount?: true
    paid_at?: true
    proof_image?: true
  }

  export type BookingsMaxAggregateInputType = {
    id?: true
    user_id?: true
    property_id?: true
    status?: true
    check_in_date?: true
    check_out_date?: true
    total_price?: true
    payment_deadline?: true
    created_at?: true
    updated_at?: true
    amount?: true
    paid_at?: true
    proof_image?: true
  }

  export type BookingsCountAggregateInputType = {
    id?: true
    user_id?: true
    property_id?: true
    status?: true
    check_in_date?: true
    check_out_date?: true
    total_price?: true
    payment_deadline?: true
    created_at?: true
    updated_at?: true
    amount?: true
    paid_at?: true
    proof_image?: true
    _all?: true
  }

  export type BookingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bookings to aggregate.
     */
    where?: bookingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bookings to fetch.
     */
    orderBy?: bookingsOrderByWithRelationInput | bookingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: bookingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned bookings
    **/
    _count?: true | BookingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookingsMaxAggregateInputType
  }

  export type GetBookingsAggregateType<T extends BookingsAggregateArgs> = {
        [P in keyof T & keyof AggregateBookings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBookings[P]>
      : GetScalarType<T[P], AggregateBookings[P]>
  }




  export type bookingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: bookingsWhereInput
    orderBy?: bookingsOrderByWithAggregationInput | bookingsOrderByWithAggregationInput[]
    by: BookingsScalarFieldEnum[] | BookingsScalarFieldEnum
    having?: bookingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookingsCountAggregateInputType | true
    _avg?: BookingsAvgAggregateInputType
    _sum?: BookingsSumAggregateInputType
    _min?: BookingsMinAggregateInputType
    _max?: BookingsMaxAggregateInputType
  }

  export type BookingsGroupByOutputType = {
    id: string
    user_id: string
    property_id: string
    status: $Enums.BookingStatus
    check_in_date: Date
    check_out_date: Date
    total_price: Decimal
    payment_deadline: Date
    created_at: Date
    updated_at: Date
    amount: Decimal
    paid_at: Date | null
    proof_image: string | null
    _count: BookingsCountAggregateOutputType | null
    _avg: BookingsAvgAggregateOutputType | null
    _sum: BookingsSumAggregateOutputType | null
    _min: BookingsMinAggregateOutputType | null
    _max: BookingsMaxAggregateOutputType | null
  }

  type GetBookingsGroupByPayload<T extends bookingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookingsGroupByOutputType[P]>
            : GetScalarType<T[P], BookingsGroupByOutputType[P]>
        }
      >
    >


  export type bookingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    property_id?: boolean
    status?: boolean
    check_in_date?: boolean
    check_out_date?: boolean
    total_price?: boolean
    payment_deadline?: boolean
    created_at?: boolean
    updated_at?: boolean
    amount?: boolean
    paid_at?: boolean
    proof_image?: boolean
    booking_rooms?: boolean | bookings$booking_roomsArgs<ExtArgs>
    property?: boolean | propertiesDefaultArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
    reviews?: boolean | bookings$reviewsArgs<ExtArgs>
    _count?: boolean | BookingsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookings"]>

  export type bookingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    property_id?: boolean
    status?: boolean
    check_in_date?: boolean
    check_out_date?: boolean
    total_price?: boolean
    payment_deadline?: boolean
    created_at?: boolean
    updated_at?: boolean
    amount?: boolean
    paid_at?: boolean
    proof_image?: boolean
    property?: boolean | propertiesDefaultArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookings"]>

  export type bookingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    property_id?: boolean
    status?: boolean
    check_in_date?: boolean
    check_out_date?: boolean
    total_price?: boolean
    payment_deadline?: boolean
    created_at?: boolean
    updated_at?: boolean
    amount?: boolean
    paid_at?: boolean
    proof_image?: boolean
    property?: boolean | propertiesDefaultArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookings"]>

  export type bookingsSelectScalar = {
    id?: boolean
    user_id?: boolean
    property_id?: boolean
    status?: boolean
    check_in_date?: boolean
    check_out_date?: boolean
    total_price?: boolean
    payment_deadline?: boolean
    created_at?: boolean
    updated_at?: boolean
    amount?: boolean
    paid_at?: boolean
    proof_image?: boolean
  }

  export type bookingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "property_id" | "status" | "check_in_date" | "check_out_date" | "total_price" | "payment_deadline" | "created_at" | "updated_at" | "amount" | "paid_at" | "proof_image", ExtArgs["result"]["bookings"]>
  export type bookingsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking_rooms?: boolean | bookings$booking_roomsArgs<ExtArgs>
    property?: boolean | propertiesDefaultArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
    reviews?: boolean | bookings$reviewsArgs<ExtArgs>
    _count?: boolean | BookingsCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type bookingsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | propertiesDefaultArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type bookingsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | propertiesDefaultArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $bookingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "bookings"
    objects: {
      booking_rooms: Prisma.$booking_roomsPayload<ExtArgs>[]
      property: Prisma.$propertiesPayload<ExtArgs>
      user: Prisma.$usersPayload<ExtArgs>
      reviews: Prisma.$reviewsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      property_id: string
      status: $Enums.BookingStatus
      check_in_date: Date
      check_out_date: Date
      total_price: Prisma.Decimal
      payment_deadline: Date
      created_at: Date
      updated_at: Date
      amount: Prisma.Decimal
      paid_at: Date | null
      proof_image: string | null
    }, ExtArgs["result"]["bookings"]>
    composites: {}
  }

  type bookingsGetPayload<S extends boolean | null | undefined | bookingsDefaultArgs> = $Result.GetResult<Prisma.$bookingsPayload, S>

  type bookingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<bookingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BookingsCountAggregateInputType | true
    }

  export interface bookingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['bookings'], meta: { name: 'bookings' } }
    /**
     * Find zero or one Bookings that matches the filter.
     * @param {bookingsFindUniqueArgs} args - Arguments to find a Bookings
     * @example
     * // Get one Bookings
     * const bookings = await prisma.bookings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends bookingsFindUniqueArgs>(args: SelectSubset<T, bookingsFindUniqueArgs<ExtArgs>>): Prisma__bookingsClient<$Result.GetResult<Prisma.$bookingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bookings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {bookingsFindUniqueOrThrowArgs} args - Arguments to find a Bookings
     * @example
     * // Get one Bookings
     * const bookings = await prisma.bookings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends bookingsFindUniqueOrThrowArgs>(args: SelectSubset<T, bookingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__bookingsClient<$Result.GetResult<Prisma.$bookingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookingsFindFirstArgs} args - Arguments to find a Bookings
     * @example
     * // Get one Bookings
     * const bookings = await prisma.bookings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends bookingsFindFirstArgs>(args?: SelectSubset<T, bookingsFindFirstArgs<ExtArgs>>): Prisma__bookingsClient<$Result.GetResult<Prisma.$bookingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bookings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookingsFindFirstOrThrowArgs} args - Arguments to find a Bookings
     * @example
     * // Get one Bookings
     * const bookings = await prisma.bookings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends bookingsFindFirstOrThrowArgs>(args?: SelectSubset<T, bookingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__bookingsClient<$Result.GetResult<Prisma.$bookingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookings
     * const bookings = await prisma.bookings.findMany()
     * 
     * // Get first 10 Bookings
     * const bookings = await prisma.bookings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookingsWithIdOnly = await prisma.bookings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends bookingsFindManyArgs>(args?: SelectSubset<T, bookingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bookingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bookings.
     * @param {bookingsCreateArgs} args - Arguments to create a Bookings.
     * @example
     * // Create one Bookings
     * const Bookings = await prisma.bookings.create({
     *   data: {
     *     // ... data to create a Bookings
     *   }
     * })
     * 
     */
    create<T extends bookingsCreateArgs>(args: SelectSubset<T, bookingsCreateArgs<ExtArgs>>): Prisma__bookingsClient<$Result.GetResult<Prisma.$bookingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bookings.
     * @param {bookingsCreateManyArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const bookings = await prisma.bookings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends bookingsCreateManyArgs>(args?: SelectSubset<T, bookingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bookings and returns the data saved in the database.
     * @param {bookingsCreateManyAndReturnArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const bookings = await prisma.bookings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bookings and only return the `id`
     * const bookingsWithIdOnly = await prisma.bookings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends bookingsCreateManyAndReturnArgs>(args?: SelectSubset<T, bookingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bookingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Bookings.
     * @param {bookingsDeleteArgs} args - Arguments to delete one Bookings.
     * @example
     * // Delete one Bookings
     * const Bookings = await prisma.bookings.delete({
     *   where: {
     *     // ... filter to delete one Bookings
     *   }
     * })
     * 
     */
    delete<T extends bookingsDeleteArgs>(args: SelectSubset<T, bookingsDeleteArgs<ExtArgs>>): Prisma__bookingsClient<$Result.GetResult<Prisma.$bookingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bookings.
     * @param {bookingsUpdateArgs} args - Arguments to update one Bookings.
     * @example
     * // Update one Bookings
     * const bookings = await prisma.bookings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends bookingsUpdateArgs>(args: SelectSubset<T, bookingsUpdateArgs<ExtArgs>>): Prisma__bookingsClient<$Result.GetResult<Prisma.$bookingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bookings.
     * @param {bookingsDeleteManyArgs} args - Arguments to filter Bookings to delete.
     * @example
     * // Delete a few Bookings
     * const { count } = await prisma.bookings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends bookingsDeleteManyArgs>(args?: SelectSubset<T, bookingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookings
     * const bookings = await prisma.bookings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends bookingsUpdateManyArgs>(args: SelectSubset<T, bookingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bookings and returns the data updated in the database.
     * @param {bookingsUpdateManyAndReturnArgs} args - Arguments to update many Bookings.
     * @example
     * // Update many Bookings
     * const bookings = await prisma.bookings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bookings and only return the `id`
     * const bookingsWithIdOnly = await prisma.bookings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends bookingsUpdateManyAndReturnArgs>(args: SelectSubset<T, bookingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bookingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Bookings.
     * @param {bookingsUpsertArgs} args - Arguments to update or create a Bookings.
     * @example
     * // Update or create a Bookings
     * const bookings = await prisma.bookings.upsert({
     *   create: {
     *     // ... data to create a Bookings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bookings we want to update
     *   }
     * })
     */
    upsert<T extends bookingsUpsertArgs>(args: SelectSubset<T, bookingsUpsertArgs<ExtArgs>>): Prisma__bookingsClient<$Result.GetResult<Prisma.$bookingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookingsCountArgs} args - Arguments to filter Bookings to count.
     * @example
     * // Count the number of Bookings
     * const count = await prisma.bookings.count({
     *   where: {
     *     // ... the filter for the Bookings we want to count
     *   }
     * })
    **/
    count<T extends bookingsCountArgs>(
      args?: Subset<T, bookingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookingsAggregateArgs>(args: Subset<T, BookingsAggregateArgs>): Prisma.PrismaPromise<GetBookingsAggregateType<T>>

    /**
     * Group by Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bookingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends bookingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: bookingsGroupByArgs['orderBy'] }
        : { orderBy?: bookingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, bookingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the bookings model
   */
  readonly fields: bookingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for bookings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__bookingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    booking_rooms<T extends bookings$booking_roomsArgs<ExtArgs> = {}>(args?: Subset<T, bookings$booking_roomsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$booking_roomsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    property<T extends propertiesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, propertiesDefaultArgs<ExtArgs>>): Prisma__propertiesClient<$Result.GetResult<Prisma.$propertiesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    reviews<T extends bookings$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, bookings$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the bookings model
   */
  interface bookingsFieldRefs {
    readonly id: FieldRef<"bookings", 'String'>
    readonly user_id: FieldRef<"bookings", 'String'>
    readonly property_id: FieldRef<"bookings", 'String'>
    readonly status: FieldRef<"bookings", 'BookingStatus'>
    readonly check_in_date: FieldRef<"bookings", 'DateTime'>
    readonly check_out_date: FieldRef<"bookings", 'DateTime'>
    readonly total_price: FieldRef<"bookings", 'Decimal'>
    readonly payment_deadline: FieldRef<"bookings", 'DateTime'>
    readonly created_at: FieldRef<"bookings", 'DateTime'>
    readonly updated_at: FieldRef<"bookings", 'DateTime'>
    readonly amount: FieldRef<"bookings", 'Decimal'>
    readonly paid_at: FieldRef<"bookings", 'DateTime'>
    readonly proof_image: FieldRef<"bookings", 'String'>
  }
    

  // Custom InputTypes
  /**
   * bookings findUnique
   */
  export type bookingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookings
     */
    select?: bookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookings
     */
    omit?: bookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookingsInclude<ExtArgs> | null
    /**
     * Filter, which bookings to fetch.
     */
    where: bookingsWhereUniqueInput
  }

  /**
   * bookings findUniqueOrThrow
   */
  export type bookingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookings
     */
    select?: bookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookings
     */
    omit?: bookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookingsInclude<ExtArgs> | null
    /**
     * Filter, which bookings to fetch.
     */
    where: bookingsWhereUniqueInput
  }

  /**
   * bookings findFirst
   */
  export type bookingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookings
     */
    select?: bookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookings
     */
    omit?: bookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookingsInclude<ExtArgs> | null
    /**
     * Filter, which bookings to fetch.
     */
    where?: bookingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bookings to fetch.
     */
    orderBy?: bookingsOrderByWithRelationInput | bookingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bookings.
     */
    cursor?: bookingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bookings.
     */
    distinct?: BookingsScalarFieldEnum | BookingsScalarFieldEnum[]
  }

  /**
   * bookings findFirstOrThrow
   */
  export type bookingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookings
     */
    select?: bookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookings
     */
    omit?: bookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookingsInclude<ExtArgs> | null
    /**
     * Filter, which bookings to fetch.
     */
    where?: bookingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bookings to fetch.
     */
    orderBy?: bookingsOrderByWithRelationInput | bookingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bookings.
     */
    cursor?: bookingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bookings.
     */
    distinct?: BookingsScalarFieldEnum | BookingsScalarFieldEnum[]
  }

  /**
   * bookings findMany
   */
  export type bookingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookings
     */
    select?: bookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookings
     */
    omit?: bookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookingsInclude<ExtArgs> | null
    /**
     * Filter, which bookings to fetch.
     */
    where?: bookingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bookings to fetch.
     */
    orderBy?: bookingsOrderByWithRelationInput | bookingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing bookings.
     */
    cursor?: bookingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bookings.
     */
    skip?: number
    distinct?: BookingsScalarFieldEnum | BookingsScalarFieldEnum[]
  }

  /**
   * bookings create
   */
  export type bookingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookings
     */
    select?: bookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookings
     */
    omit?: bookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookingsInclude<ExtArgs> | null
    /**
     * The data needed to create a bookings.
     */
    data: XOR<bookingsCreateInput, bookingsUncheckedCreateInput>
  }

  /**
   * bookings createMany
   */
  export type bookingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many bookings.
     */
    data: bookingsCreateManyInput | bookingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * bookings createManyAndReturn
   */
  export type bookingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookings
     */
    select?: bookingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the bookings
     */
    omit?: bookingsOmit<ExtArgs> | null
    /**
     * The data used to create many bookings.
     */
    data: bookingsCreateManyInput | bookingsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookingsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * bookings update
   */
  export type bookingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookings
     */
    select?: bookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookings
     */
    omit?: bookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookingsInclude<ExtArgs> | null
    /**
     * The data needed to update a bookings.
     */
    data: XOR<bookingsUpdateInput, bookingsUncheckedUpdateInput>
    /**
     * Choose, which bookings to update.
     */
    where: bookingsWhereUniqueInput
  }

  /**
   * bookings updateMany
   */
  export type bookingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update bookings.
     */
    data: XOR<bookingsUpdateManyMutationInput, bookingsUncheckedUpdateManyInput>
    /**
     * Filter which bookings to update
     */
    where?: bookingsWhereInput
    /**
     * Limit how many bookings to update.
     */
    limit?: number
  }

  /**
   * bookings updateManyAndReturn
   */
  export type bookingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookings
     */
    select?: bookingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the bookings
     */
    omit?: bookingsOmit<ExtArgs> | null
    /**
     * The data used to update bookings.
     */
    data: XOR<bookingsUpdateManyMutationInput, bookingsUncheckedUpdateManyInput>
    /**
     * Filter which bookings to update
     */
    where?: bookingsWhereInput
    /**
     * Limit how many bookings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookingsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * bookings upsert
   */
  export type bookingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookings
     */
    select?: bookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookings
     */
    omit?: bookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookingsInclude<ExtArgs> | null
    /**
     * The filter to search for the bookings to update in case it exists.
     */
    where: bookingsWhereUniqueInput
    /**
     * In case the bookings found by the `where` argument doesn't exist, create a new bookings with this data.
     */
    create: XOR<bookingsCreateInput, bookingsUncheckedCreateInput>
    /**
     * In case the bookings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<bookingsUpdateInput, bookingsUncheckedUpdateInput>
  }

  /**
   * bookings delete
   */
  export type bookingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookings
     */
    select?: bookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookings
     */
    omit?: bookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookingsInclude<ExtArgs> | null
    /**
     * Filter which bookings to delete.
     */
    where: bookingsWhereUniqueInput
  }

  /**
   * bookings deleteMany
   */
  export type bookingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bookings to delete
     */
    where?: bookingsWhereInput
    /**
     * Limit how many bookings to delete.
     */
    limit?: number
  }

  /**
   * bookings.booking_rooms
   */
  export type bookings$booking_roomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the booking_rooms
     */
    select?: booking_roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the booking_rooms
     */
    omit?: booking_roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: booking_roomsInclude<ExtArgs> | null
    where?: booking_roomsWhereInput
    orderBy?: booking_roomsOrderByWithRelationInput | booking_roomsOrderByWithRelationInput[]
    cursor?: booking_roomsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Booking_roomsScalarFieldEnum | Booking_roomsScalarFieldEnum[]
  }

  /**
   * bookings.reviews
   */
  export type bookings$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    where?: reviewsWhereInput
    orderBy?: reviewsOrderByWithRelationInput | reviewsOrderByWithRelationInput[]
    cursor?: reviewsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewsScalarFieldEnum | ReviewsScalarFieldEnum[]
  }

  /**
   * bookings without action
   */
  export type bookingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bookings
     */
    select?: bookingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bookings
     */
    omit?: bookingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bookingsInclude<ExtArgs> | null
  }


  /**
   * Model booking_rooms
   */

  export type AggregateBooking_rooms = {
    _count: Booking_roomsCountAggregateOutputType | null
    _avg: Booking_roomsAvgAggregateOutputType | null
    _sum: Booking_roomsSumAggregateOutputType | null
    _min: Booking_roomsMinAggregateOutputType | null
    _max: Booking_roomsMaxAggregateOutputType | null
  }

  export type Booking_roomsAvgAggregateOutputType = {
    guests_count: number | null
    price_per_night: Decimal | null
    nights: number | null
    quantity: number | null
    subtotal: Decimal | null
  }

  export type Booking_roomsSumAggregateOutputType = {
    guests_count: number | null
    price_per_night: Decimal | null
    nights: number | null
    quantity: number | null
    subtotal: Decimal | null
  }

  export type Booking_roomsMinAggregateOutputType = {
    id: string | null
    booking_id: string | null
    room_id: string | null
    guests_count: number | null
    price_per_night: Decimal | null
    check_in_date: Date | null
    check_out_date: Date | null
    nights: number | null
    quantity: number | null
    subtotal: Decimal | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Booking_roomsMaxAggregateOutputType = {
    id: string | null
    booking_id: string | null
    room_id: string | null
    guests_count: number | null
    price_per_night: Decimal | null
    check_in_date: Date | null
    check_out_date: Date | null
    nights: number | null
    quantity: number | null
    subtotal: Decimal | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Booking_roomsCountAggregateOutputType = {
    id: number
    booking_id: number
    room_id: number
    guests_count: number
    price_per_night: number
    check_in_date: number
    check_out_date: number
    nights: number
    quantity: number
    subtotal: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Booking_roomsAvgAggregateInputType = {
    guests_count?: true
    price_per_night?: true
    nights?: true
    quantity?: true
    subtotal?: true
  }

  export type Booking_roomsSumAggregateInputType = {
    guests_count?: true
    price_per_night?: true
    nights?: true
    quantity?: true
    subtotal?: true
  }

  export type Booking_roomsMinAggregateInputType = {
    id?: true
    booking_id?: true
    room_id?: true
    guests_count?: true
    price_per_night?: true
    check_in_date?: true
    check_out_date?: true
    nights?: true
    quantity?: true
    subtotal?: true
    created_at?: true
    updated_at?: true
  }

  export type Booking_roomsMaxAggregateInputType = {
    id?: true
    booking_id?: true
    room_id?: true
    guests_count?: true
    price_per_night?: true
    check_in_date?: true
    check_out_date?: true
    nights?: true
    quantity?: true
    subtotal?: true
    created_at?: true
    updated_at?: true
  }

  export type Booking_roomsCountAggregateInputType = {
    id?: true
    booking_id?: true
    room_id?: true
    guests_count?: true
    price_per_night?: true
    check_in_date?: true
    check_out_date?: true
    nights?: true
    quantity?: true
    subtotal?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Booking_roomsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which booking_rooms to aggregate.
     */
    where?: booking_roomsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of booking_rooms to fetch.
     */
    orderBy?: booking_roomsOrderByWithRelationInput | booking_roomsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: booking_roomsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` booking_rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` booking_rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned booking_rooms
    **/
    _count?: true | Booking_roomsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Booking_roomsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Booking_roomsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Booking_roomsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Booking_roomsMaxAggregateInputType
  }

  export type GetBooking_roomsAggregateType<T extends Booking_roomsAggregateArgs> = {
        [P in keyof T & keyof AggregateBooking_rooms]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBooking_rooms[P]>
      : GetScalarType<T[P], AggregateBooking_rooms[P]>
  }




  export type booking_roomsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: booking_roomsWhereInput
    orderBy?: booking_roomsOrderByWithAggregationInput | booking_roomsOrderByWithAggregationInput[]
    by: Booking_roomsScalarFieldEnum[] | Booking_roomsScalarFieldEnum
    having?: booking_roomsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Booking_roomsCountAggregateInputType | true
    _avg?: Booking_roomsAvgAggregateInputType
    _sum?: Booking_roomsSumAggregateInputType
    _min?: Booking_roomsMinAggregateInputType
    _max?: Booking_roomsMaxAggregateInputType
  }

  export type Booking_roomsGroupByOutputType = {
    id: string
    booking_id: string
    room_id: string
    guests_count: number
    price_per_night: Decimal
    check_in_date: Date
    check_out_date: Date
    nights: number
    quantity: number
    subtotal: Decimal
    created_at: Date
    updated_at: Date
    _count: Booking_roomsCountAggregateOutputType | null
    _avg: Booking_roomsAvgAggregateOutputType | null
    _sum: Booking_roomsSumAggregateOutputType | null
    _min: Booking_roomsMinAggregateOutputType | null
    _max: Booking_roomsMaxAggregateOutputType | null
  }

  type GetBooking_roomsGroupByPayload<T extends booking_roomsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Booking_roomsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Booking_roomsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Booking_roomsGroupByOutputType[P]>
            : GetScalarType<T[P], Booking_roomsGroupByOutputType[P]>
        }
      >
    >


  export type booking_roomsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    booking_id?: boolean
    room_id?: boolean
    guests_count?: boolean
    price_per_night?: boolean
    check_in_date?: boolean
    check_out_date?: boolean
    nights?: boolean
    quantity?: boolean
    subtotal?: boolean
    created_at?: boolean
    updated_at?: boolean
    booking?: boolean | bookingsDefaultArgs<ExtArgs>
    room?: boolean | roomsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking_rooms"]>

  export type booking_roomsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    booking_id?: boolean
    room_id?: boolean
    guests_count?: boolean
    price_per_night?: boolean
    check_in_date?: boolean
    check_out_date?: boolean
    nights?: boolean
    quantity?: boolean
    subtotal?: boolean
    created_at?: boolean
    updated_at?: boolean
    booking?: boolean | bookingsDefaultArgs<ExtArgs>
    room?: boolean | roomsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking_rooms"]>

  export type booking_roomsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    booking_id?: boolean
    room_id?: boolean
    guests_count?: boolean
    price_per_night?: boolean
    check_in_date?: boolean
    check_out_date?: boolean
    nights?: boolean
    quantity?: boolean
    subtotal?: boolean
    created_at?: boolean
    updated_at?: boolean
    booking?: boolean | bookingsDefaultArgs<ExtArgs>
    room?: boolean | roomsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["booking_rooms"]>

  export type booking_roomsSelectScalar = {
    id?: boolean
    booking_id?: boolean
    room_id?: boolean
    guests_count?: boolean
    price_per_night?: boolean
    check_in_date?: boolean
    check_out_date?: boolean
    nights?: boolean
    quantity?: boolean
    subtotal?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type booking_roomsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "booking_id" | "room_id" | "guests_count" | "price_per_night" | "check_in_date" | "check_out_date" | "nights" | "quantity" | "subtotal" | "created_at" | "updated_at", ExtArgs["result"]["booking_rooms"]>
  export type booking_roomsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | bookingsDefaultArgs<ExtArgs>
    room?: boolean | roomsDefaultArgs<ExtArgs>
  }
  export type booking_roomsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | bookingsDefaultArgs<ExtArgs>
    room?: boolean | roomsDefaultArgs<ExtArgs>
  }
  export type booking_roomsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | bookingsDefaultArgs<ExtArgs>
    room?: boolean | roomsDefaultArgs<ExtArgs>
  }

  export type $booking_roomsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "booking_rooms"
    objects: {
      booking: Prisma.$bookingsPayload<ExtArgs>
      room: Prisma.$roomsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      booking_id: string
      room_id: string
      guests_count: number
      price_per_night: Prisma.Decimal
      check_in_date: Date
      check_out_date: Date
      nights: number
      quantity: number
      subtotal: Prisma.Decimal
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["booking_rooms"]>
    composites: {}
  }

  type booking_roomsGetPayload<S extends boolean | null | undefined | booking_roomsDefaultArgs> = $Result.GetResult<Prisma.$booking_roomsPayload, S>

  type booking_roomsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<booking_roomsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Booking_roomsCountAggregateInputType | true
    }

  export interface booking_roomsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['booking_rooms'], meta: { name: 'booking_rooms' } }
    /**
     * Find zero or one Booking_rooms that matches the filter.
     * @param {booking_roomsFindUniqueArgs} args - Arguments to find a Booking_rooms
     * @example
     * // Get one Booking_rooms
     * const booking_rooms = await prisma.booking_rooms.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends booking_roomsFindUniqueArgs>(args: SelectSubset<T, booking_roomsFindUniqueArgs<ExtArgs>>): Prisma__booking_roomsClient<$Result.GetResult<Prisma.$booking_roomsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Booking_rooms that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {booking_roomsFindUniqueOrThrowArgs} args - Arguments to find a Booking_rooms
     * @example
     * // Get one Booking_rooms
     * const booking_rooms = await prisma.booking_rooms.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends booking_roomsFindUniqueOrThrowArgs>(args: SelectSubset<T, booking_roomsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__booking_roomsClient<$Result.GetResult<Prisma.$booking_roomsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Booking_rooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {booking_roomsFindFirstArgs} args - Arguments to find a Booking_rooms
     * @example
     * // Get one Booking_rooms
     * const booking_rooms = await prisma.booking_rooms.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends booking_roomsFindFirstArgs>(args?: SelectSubset<T, booking_roomsFindFirstArgs<ExtArgs>>): Prisma__booking_roomsClient<$Result.GetResult<Prisma.$booking_roomsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Booking_rooms that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {booking_roomsFindFirstOrThrowArgs} args - Arguments to find a Booking_rooms
     * @example
     * // Get one Booking_rooms
     * const booking_rooms = await prisma.booking_rooms.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends booking_roomsFindFirstOrThrowArgs>(args?: SelectSubset<T, booking_roomsFindFirstOrThrowArgs<ExtArgs>>): Prisma__booking_roomsClient<$Result.GetResult<Prisma.$booking_roomsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Booking_rooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {booking_roomsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Booking_rooms
     * const booking_rooms = await prisma.booking_rooms.findMany()
     * 
     * // Get first 10 Booking_rooms
     * const booking_rooms = await prisma.booking_rooms.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const booking_roomsWithIdOnly = await prisma.booking_rooms.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends booking_roomsFindManyArgs>(args?: SelectSubset<T, booking_roomsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$booking_roomsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Booking_rooms.
     * @param {booking_roomsCreateArgs} args - Arguments to create a Booking_rooms.
     * @example
     * // Create one Booking_rooms
     * const Booking_rooms = await prisma.booking_rooms.create({
     *   data: {
     *     // ... data to create a Booking_rooms
     *   }
     * })
     * 
     */
    create<T extends booking_roomsCreateArgs>(args: SelectSubset<T, booking_roomsCreateArgs<ExtArgs>>): Prisma__booking_roomsClient<$Result.GetResult<Prisma.$booking_roomsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Booking_rooms.
     * @param {booking_roomsCreateManyArgs} args - Arguments to create many Booking_rooms.
     * @example
     * // Create many Booking_rooms
     * const booking_rooms = await prisma.booking_rooms.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends booking_roomsCreateManyArgs>(args?: SelectSubset<T, booking_roomsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Booking_rooms and returns the data saved in the database.
     * @param {booking_roomsCreateManyAndReturnArgs} args - Arguments to create many Booking_rooms.
     * @example
     * // Create many Booking_rooms
     * const booking_rooms = await prisma.booking_rooms.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Booking_rooms and only return the `id`
     * const booking_roomsWithIdOnly = await prisma.booking_rooms.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends booking_roomsCreateManyAndReturnArgs>(args?: SelectSubset<T, booking_roomsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$booking_roomsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Booking_rooms.
     * @param {booking_roomsDeleteArgs} args - Arguments to delete one Booking_rooms.
     * @example
     * // Delete one Booking_rooms
     * const Booking_rooms = await prisma.booking_rooms.delete({
     *   where: {
     *     // ... filter to delete one Booking_rooms
     *   }
     * })
     * 
     */
    delete<T extends booking_roomsDeleteArgs>(args: SelectSubset<T, booking_roomsDeleteArgs<ExtArgs>>): Prisma__booking_roomsClient<$Result.GetResult<Prisma.$booking_roomsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Booking_rooms.
     * @param {booking_roomsUpdateArgs} args - Arguments to update one Booking_rooms.
     * @example
     * // Update one Booking_rooms
     * const booking_rooms = await prisma.booking_rooms.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends booking_roomsUpdateArgs>(args: SelectSubset<T, booking_roomsUpdateArgs<ExtArgs>>): Prisma__booking_roomsClient<$Result.GetResult<Prisma.$booking_roomsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Booking_rooms.
     * @param {booking_roomsDeleteManyArgs} args - Arguments to filter Booking_rooms to delete.
     * @example
     * // Delete a few Booking_rooms
     * const { count } = await prisma.booking_rooms.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends booking_roomsDeleteManyArgs>(args?: SelectSubset<T, booking_roomsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Booking_rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {booking_roomsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Booking_rooms
     * const booking_rooms = await prisma.booking_rooms.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends booking_roomsUpdateManyArgs>(args: SelectSubset<T, booking_roomsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Booking_rooms and returns the data updated in the database.
     * @param {booking_roomsUpdateManyAndReturnArgs} args - Arguments to update many Booking_rooms.
     * @example
     * // Update many Booking_rooms
     * const booking_rooms = await prisma.booking_rooms.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Booking_rooms and only return the `id`
     * const booking_roomsWithIdOnly = await prisma.booking_rooms.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends booking_roomsUpdateManyAndReturnArgs>(args: SelectSubset<T, booking_roomsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$booking_roomsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Booking_rooms.
     * @param {booking_roomsUpsertArgs} args - Arguments to update or create a Booking_rooms.
     * @example
     * // Update or create a Booking_rooms
     * const booking_rooms = await prisma.booking_rooms.upsert({
     *   create: {
     *     // ... data to create a Booking_rooms
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Booking_rooms we want to update
     *   }
     * })
     */
    upsert<T extends booking_roomsUpsertArgs>(args: SelectSubset<T, booking_roomsUpsertArgs<ExtArgs>>): Prisma__booking_roomsClient<$Result.GetResult<Prisma.$booking_roomsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Booking_rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {booking_roomsCountArgs} args - Arguments to filter Booking_rooms to count.
     * @example
     * // Count the number of Booking_rooms
     * const count = await prisma.booking_rooms.count({
     *   where: {
     *     // ... the filter for the Booking_rooms we want to count
     *   }
     * })
    **/
    count<T extends booking_roomsCountArgs>(
      args?: Subset<T, booking_roomsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Booking_roomsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Booking_rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Booking_roomsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Booking_roomsAggregateArgs>(args: Subset<T, Booking_roomsAggregateArgs>): Prisma.PrismaPromise<GetBooking_roomsAggregateType<T>>

    /**
     * Group by Booking_rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {booking_roomsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends booking_roomsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: booking_roomsGroupByArgs['orderBy'] }
        : { orderBy?: booking_roomsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, booking_roomsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBooking_roomsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the booking_rooms model
   */
  readonly fields: booking_roomsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for booking_rooms.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__booking_roomsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    booking<T extends bookingsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, bookingsDefaultArgs<ExtArgs>>): Prisma__bookingsClient<$Result.GetResult<Prisma.$bookingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    room<T extends roomsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, roomsDefaultArgs<ExtArgs>>): Prisma__roomsClient<$Result.GetResult<Prisma.$roomsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the booking_rooms model
   */
  interface booking_roomsFieldRefs {
    readonly id: FieldRef<"booking_rooms", 'String'>
    readonly booking_id: FieldRef<"booking_rooms", 'String'>
    readonly room_id: FieldRef<"booking_rooms", 'String'>
    readonly guests_count: FieldRef<"booking_rooms", 'Int'>
    readonly price_per_night: FieldRef<"booking_rooms", 'Decimal'>
    readonly check_in_date: FieldRef<"booking_rooms", 'DateTime'>
    readonly check_out_date: FieldRef<"booking_rooms", 'DateTime'>
    readonly nights: FieldRef<"booking_rooms", 'Int'>
    readonly quantity: FieldRef<"booking_rooms", 'Int'>
    readonly subtotal: FieldRef<"booking_rooms", 'Decimal'>
    readonly created_at: FieldRef<"booking_rooms", 'DateTime'>
    readonly updated_at: FieldRef<"booking_rooms", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * booking_rooms findUnique
   */
  export type booking_roomsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the booking_rooms
     */
    select?: booking_roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the booking_rooms
     */
    omit?: booking_roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: booking_roomsInclude<ExtArgs> | null
    /**
     * Filter, which booking_rooms to fetch.
     */
    where: booking_roomsWhereUniqueInput
  }

  /**
   * booking_rooms findUniqueOrThrow
   */
  export type booking_roomsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the booking_rooms
     */
    select?: booking_roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the booking_rooms
     */
    omit?: booking_roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: booking_roomsInclude<ExtArgs> | null
    /**
     * Filter, which booking_rooms to fetch.
     */
    where: booking_roomsWhereUniqueInput
  }

  /**
   * booking_rooms findFirst
   */
  export type booking_roomsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the booking_rooms
     */
    select?: booking_roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the booking_rooms
     */
    omit?: booking_roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: booking_roomsInclude<ExtArgs> | null
    /**
     * Filter, which booking_rooms to fetch.
     */
    where?: booking_roomsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of booking_rooms to fetch.
     */
    orderBy?: booking_roomsOrderByWithRelationInput | booking_roomsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for booking_rooms.
     */
    cursor?: booking_roomsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` booking_rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` booking_rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of booking_rooms.
     */
    distinct?: Booking_roomsScalarFieldEnum | Booking_roomsScalarFieldEnum[]
  }

  /**
   * booking_rooms findFirstOrThrow
   */
  export type booking_roomsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the booking_rooms
     */
    select?: booking_roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the booking_rooms
     */
    omit?: booking_roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: booking_roomsInclude<ExtArgs> | null
    /**
     * Filter, which booking_rooms to fetch.
     */
    where?: booking_roomsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of booking_rooms to fetch.
     */
    orderBy?: booking_roomsOrderByWithRelationInput | booking_roomsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for booking_rooms.
     */
    cursor?: booking_roomsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` booking_rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` booking_rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of booking_rooms.
     */
    distinct?: Booking_roomsScalarFieldEnum | Booking_roomsScalarFieldEnum[]
  }

  /**
   * booking_rooms findMany
   */
  export type booking_roomsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the booking_rooms
     */
    select?: booking_roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the booking_rooms
     */
    omit?: booking_roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: booking_roomsInclude<ExtArgs> | null
    /**
     * Filter, which booking_rooms to fetch.
     */
    where?: booking_roomsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of booking_rooms to fetch.
     */
    orderBy?: booking_roomsOrderByWithRelationInput | booking_roomsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing booking_rooms.
     */
    cursor?: booking_roomsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` booking_rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` booking_rooms.
     */
    skip?: number
    distinct?: Booking_roomsScalarFieldEnum | Booking_roomsScalarFieldEnum[]
  }

  /**
   * booking_rooms create
   */
  export type booking_roomsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the booking_rooms
     */
    select?: booking_roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the booking_rooms
     */
    omit?: booking_roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: booking_roomsInclude<ExtArgs> | null
    /**
     * The data needed to create a booking_rooms.
     */
    data: XOR<booking_roomsCreateInput, booking_roomsUncheckedCreateInput>
  }

  /**
   * booking_rooms createMany
   */
  export type booking_roomsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many booking_rooms.
     */
    data: booking_roomsCreateManyInput | booking_roomsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * booking_rooms createManyAndReturn
   */
  export type booking_roomsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the booking_rooms
     */
    select?: booking_roomsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the booking_rooms
     */
    omit?: booking_roomsOmit<ExtArgs> | null
    /**
     * The data used to create many booking_rooms.
     */
    data: booking_roomsCreateManyInput | booking_roomsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: booking_roomsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * booking_rooms update
   */
  export type booking_roomsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the booking_rooms
     */
    select?: booking_roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the booking_rooms
     */
    omit?: booking_roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: booking_roomsInclude<ExtArgs> | null
    /**
     * The data needed to update a booking_rooms.
     */
    data: XOR<booking_roomsUpdateInput, booking_roomsUncheckedUpdateInput>
    /**
     * Choose, which booking_rooms to update.
     */
    where: booking_roomsWhereUniqueInput
  }

  /**
   * booking_rooms updateMany
   */
  export type booking_roomsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update booking_rooms.
     */
    data: XOR<booking_roomsUpdateManyMutationInput, booking_roomsUncheckedUpdateManyInput>
    /**
     * Filter which booking_rooms to update
     */
    where?: booking_roomsWhereInput
    /**
     * Limit how many booking_rooms to update.
     */
    limit?: number
  }

  /**
   * booking_rooms updateManyAndReturn
   */
  export type booking_roomsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the booking_rooms
     */
    select?: booking_roomsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the booking_rooms
     */
    omit?: booking_roomsOmit<ExtArgs> | null
    /**
     * The data used to update booking_rooms.
     */
    data: XOR<booking_roomsUpdateManyMutationInput, booking_roomsUncheckedUpdateManyInput>
    /**
     * Filter which booking_rooms to update
     */
    where?: booking_roomsWhereInput
    /**
     * Limit how many booking_rooms to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: booking_roomsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * booking_rooms upsert
   */
  export type booking_roomsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the booking_rooms
     */
    select?: booking_roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the booking_rooms
     */
    omit?: booking_roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: booking_roomsInclude<ExtArgs> | null
    /**
     * The filter to search for the booking_rooms to update in case it exists.
     */
    where: booking_roomsWhereUniqueInput
    /**
     * In case the booking_rooms found by the `where` argument doesn't exist, create a new booking_rooms with this data.
     */
    create: XOR<booking_roomsCreateInput, booking_roomsUncheckedCreateInput>
    /**
     * In case the booking_rooms was found with the provided `where` argument, update it with this data.
     */
    update: XOR<booking_roomsUpdateInput, booking_roomsUncheckedUpdateInput>
  }

  /**
   * booking_rooms delete
   */
  export type booking_roomsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the booking_rooms
     */
    select?: booking_roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the booking_rooms
     */
    omit?: booking_roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: booking_roomsInclude<ExtArgs> | null
    /**
     * Filter which booking_rooms to delete.
     */
    where: booking_roomsWhereUniqueInput
  }

  /**
   * booking_rooms deleteMany
   */
  export type booking_roomsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which booking_rooms to delete
     */
    where?: booking_roomsWhereInput
    /**
     * Limit how many booking_rooms to delete.
     */
    limit?: number
  }

  /**
   * booking_rooms without action
   */
  export type booking_roomsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the booking_rooms
     */
    select?: booking_roomsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the booking_rooms
     */
    omit?: booking_roomsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: booking_roomsInclude<ExtArgs> | null
  }


  /**
   * Model reviews
   */

  export type AggregateReviews = {
    _count: ReviewsCountAggregateOutputType | null
    _min: ReviewsMinAggregateOutputType | null
    _max: ReviewsMaxAggregateOutputType | null
  }

  export type ReviewsMinAggregateOutputType = {
    id: string | null
    booking_id: string | null
    user_id: string | null
    property_id: string | null
    comment: string | null
    tenant_reply: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ReviewsMaxAggregateOutputType = {
    id: string | null
    booking_id: string | null
    user_id: string | null
    property_id: string | null
    comment: string | null
    tenant_reply: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ReviewsCountAggregateOutputType = {
    id: number
    booking_id: number
    user_id: number
    property_id: number
    comment: number
    tenant_reply: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ReviewsMinAggregateInputType = {
    id?: true
    booking_id?: true
    user_id?: true
    property_id?: true
    comment?: true
    tenant_reply?: true
    created_at?: true
    updated_at?: true
  }

  export type ReviewsMaxAggregateInputType = {
    id?: true
    booking_id?: true
    user_id?: true
    property_id?: true
    comment?: true
    tenant_reply?: true
    created_at?: true
    updated_at?: true
  }

  export type ReviewsCountAggregateInputType = {
    id?: true
    booking_id?: true
    user_id?: true
    property_id?: true
    comment?: true
    tenant_reply?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ReviewsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which reviews to aggregate.
     */
    where?: reviewsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reviews to fetch.
     */
    orderBy?: reviewsOrderByWithRelationInput | reviewsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: reviewsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned reviews
    **/
    _count?: true | ReviewsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewsMaxAggregateInputType
  }

  export type GetReviewsAggregateType<T extends ReviewsAggregateArgs> = {
        [P in keyof T & keyof AggregateReviews]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReviews[P]>
      : GetScalarType<T[P], AggregateReviews[P]>
  }




  export type reviewsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reviewsWhereInput
    orderBy?: reviewsOrderByWithAggregationInput | reviewsOrderByWithAggregationInput[]
    by: ReviewsScalarFieldEnum[] | ReviewsScalarFieldEnum
    having?: reviewsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewsCountAggregateInputType | true
    _min?: ReviewsMinAggregateInputType
    _max?: ReviewsMaxAggregateInputType
  }

  export type ReviewsGroupByOutputType = {
    id: string
    booking_id: string
    user_id: string
    property_id: string
    comment: string | null
    tenant_reply: string | null
    created_at: Date
    updated_at: Date
    _count: ReviewsCountAggregateOutputType | null
    _min: ReviewsMinAggregateOutputType | null
    _max: ReviewsMaxAggregateOutputType | null
  }

  type GetReviewsGroupByPayload<T extends reviewsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewsGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewsGroupByOutputType[P]>
        }
      >
    >


  export type reviewsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    booking_id?: boolean
    user_id?: boolean
    property_id?: boolean
    comment?: boolean
    tenant_reply?: boolean
    created_at?: boolean
    updated_at?: boolean
    booking?: boolean | bookingsDefaultArgs<ExtArgs>
    property?: boolean | propertiesDefaultArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reviews"]>

  export type reviewsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    booking_id?: boolean
    user_id?: boolean
    property_id?: boolean
    comment?: boolean
    tenant_reply?: boolean
    created_at?: boolean
    updated_at?: boolean
    booking?: boolean | bookingsDefaultArgs<ExtArgs>
    property?: boolean | propertiesDefaultArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reviews"]>

  export type reviewsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    booking_id?: boolean
    user_id?: boolean
    property_id?: boolean
    comment?: boolean
    tenant_reply?: boolean
    created_at?: boolean
    updated_at?: boolean
    booking?: boolean | bookingsDefaultArgs<ExtArgs>
    property?: boolean | propertiesDefaultArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reviews"]>

  export type reviewsSelectScalar = {
    id?: boolean
    booking_id?: boolean
    user_id?: boolean
    property_id?: boolean
    comment?: boolean
    tenant_reply?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type reviewsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "booking_id" | "user_id" | "property_id" | "comment" | "tenant_reply" | "created_at" | "updated_at", ExtArgs["result"]["reviews"]>
  export type reviewsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | bookingsDefaultArgs<ExtArgs>
    property?: boolean | propertiesDefaultArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type reviewsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | bookingsDefaultArgs<ExtArgs>
    property?: boolean | propertiesDefaultArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
  }
  export type reviewsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    booking?: boolean | bookingsDefaultArgs<ExtArgs>
    property?: boolean | propertiesDefaultArgs<ExtArgs>
    user?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $reviewsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "reviews"
    objects: {
      booking: Prisma.$bookingsPayload<ExtArgs>
      property: Prisma.$propertiesPayload<ExtArgs>
      user: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      booking_id: string
      user_id: string
      property_id: string
      comment: string | null
      tenant_reply: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["reviews"]>
    composites: {}
  }

  type reviewsGetPayload<S extends boolean | null | undefined | reviewsDefaultArgs> = $Result.GetResult<Prisma.$reviewsPayload, S>

  type reviewsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<reviewsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReviewsCountAggregateInputType | true
    }

  export interface reviewsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['reviews'], meta: { name: 'reviews' } }
    /**
     * Find zero or one Reviews that matches the filter.
     * @param {reviewsFindUniqueArgs} args - Arguments to find a Reviews
     * @example
     * // Get one Reviews
     * const reviews = await prisma.reviews.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends reviewsFindUniqueArgs>(args: SelectSubset<T, reviewsFindUniqueArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Reviews that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {reviewsFindUniqueOrThrowArgs} args - Arguments to find a Reviews
     * @example
     * // Get one Reviews
     * const reviews = await prisma.reviews.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends reviewsFindUniqueOrThrowArgs>(args: SelectSubset<T, reviewsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewsFindFirstArgs} args - Arguments to find a Reviews
     * @example
     * // Get one Reviews
     * const reviews = await prisma.reviews.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends reviewsFindFirstArgs>(args?: SelectSubset<T, reviewsFindFirstArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reviews that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewsFindFirstOrThrowArgs} args - Arguments to find a Reviews
     * @example
     * // Get one Reviews
     * const reviews = await prisma.reviews.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends reviewsFindFirstOrThrowArgs>(args?: SelectSubset<T, reviewsFindFirstOrThrowArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.reviews.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.reviews.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewsWithIdOnly = await prisma.reviews.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends reviewsFindManyArgs>(args?: SelectSubset<T, reviewsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Reviews.
     * @param {reviewsCreateArgs} args - Arguments to create a Reviews.
     * @example
     * // Create one Reviews
     * const Reviews = await prisma.reviews.create({
     *   data: {
     *     // ... data to create a Reviews
     *   }
     * })
     * 
     */
    create<T extends reviewsCreateArgs>(args: SelectSubset<T, reviewsCreateArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reviews.
     * @param {reviewsCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const reviews = await prisma.reviews.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends reviewsCreateManyArgs>(args?: SelectSubset<T, reviewsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reviews and returns the data saved in the database.
     * @param {reviewsCreateManyAndReturnArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const reviews = await prisma.reviews.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reviews and only return the `id`
     * const reviewsWithIdOnly = await prisma.reviews.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends reviewsCreateManyAndReturnArgs>(args?: SelectSubset<T, reviewsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Reviews.
     * @param {reviewsDeleteArgs} args - Arguments to delete one Reviews.
     * @example
     * // Delete one Reviews
     * const Reviews = await prisma.reviews.delete({
     *   where: {
     *     // ... filter to delete one Reviews
     *   }
     * })
     * 
     */
    delete<T extends reviewsDeleteArgs>(args: SelectSubset<T, reviewsDeleteArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Reviews.
     * @param {reviewsUpdateArgs} args - Arguments to update one Reviews.
     * @example
     * // Update one Reviews
     * const reviews = await prisma.reviews.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends reviewsUpdateArgs>(args: SelectSubset<T, reviewsUpdateArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reviews.
     * @param {reviewsDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.reviews.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends reviewsDeleteManyArgs>(args?: SelectSubset<T, reviewsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const reviews = await prisma.reviews.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends reviewsUpdateManyArgs>(args: SelectSubset<T, reviewsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews and returns the data updated in the database.
     * @param {reviewsUpdateManyAndReturnArgs} args - Arguments to update many Reviews.
     * @example
     * // Update many Reviews
     * const reviews = await prisma.reviews.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reviews and only return the `id`
     * const reviewsWithIdOnly = await prisma.reviews.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends reviewsUpdateManyAndReturnArgs>(args: SelectSubset<T, reviewsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Reviews.
     * @param {reviewsUpsertArgs} args - Arguments to update or create a Reviews.
     * @example
     * // Update or create a Reviews
     * const reviews = await prisma.reviews.upsert({
     *   create: {
     *     // ... data to create a Reviews
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reviews we want to update
     *   }
     * })
     */
    upsert<T extends reviewsUpsertArgs>(args: SelectSubset<T, reviewsUpsertArgs<ExtArgs>>): Prisma__reviewsClient<$Result.GetResult<Prisma.$reviewsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewsCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.reviews.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends reviewsCountArgs>(
      args?: Subset<T, reviewsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewsAggregateArgs>(args: Subset<T, ReviewsAggregateArgs>): Prisma.PrismaPromise<GetReviewsAggregateType<T>>

    /**
     * Group by Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends reviewsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: reviewsGroupByArgs['orderBy'] }
        : { orderBy?: reviewsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, reviewsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the reviews model
   */
  readonly fields: reviewsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for reviews.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__reviewsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    booking<T extends bookingsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, bookingsDefaultArgs<ExtArgs>>): Prisma__bookingsClient<$Result.GetResult<Prisma.$bookingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    property<T extends propertiesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, propertiesDefaultArgs<ExtArgs>>): Prisma__propertiesClient<$Result.GetResult<Prisma.$propertiesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the reviews model
   */
  interface reviewsFieldRefs {
    readonly id: FieldRef<"reviews", 'String'>
    readonly booking_id: FieldRef<"reviews", 'String'>
    readonly user_id: FieldRef<"reviews", 'String'>
    readonly property_id: FieldRef<"reviews", 'String'>
    readonly comment: FieldRef<"reviews", 'String'>
    readonly tenant_reply: FieldRef<"reviews", 'String'>
    readonly created_at: FieldRef<"reviews", 'DateTime'>
    readonly updated_at: FieldRef<"reviews", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * reviews findUnique
   */
  export type reviewsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * Filter, which reviews to fetch.
     */
    where: reviewsWhereUniqueInput
  }

  /**
   * reviews findUniqueOrThrow
   */
  export type reviewsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * Filter, which reviews to fetch.
     */
    where: reviewsWhereUniqueInput
  }

  /**
   * reviews findFirst
   */
  export type reviewsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * Filter, which reviews to fetch.
     */
    where?: reviewsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reviews to fetch.
     */
    orderBy?: reviewsOrderByWithRelationInput | reviewsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for reviews.
     */
    cursor?: reviewsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of reviews.
     */
    distinct?: ReviewsScalarFieldEnum | ReviewsScalarFieldEnum[]
  }

  /**
   * reviews findFirstOrThrow
   */
  export type reviewsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * Filter, which reviews to fetch.
     */
    where?: reviewsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reviews to fetch.
     */
    orderBy?: reviewsOrderByWithRelationInput | reviewsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for reviews.
     */
    cursor?: reviewsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of reviews.
     */
    distinct?: ReviewsScalarFieldEnum | ReviewsScalarFieldEnum[]
  }

  /**
   * reviews findMany
   */
  export type reviewsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * Filter, which reviews to fetch.
     */
    where?: reviewsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reviews to fetch.
     */
    orderBy?: reviewsOrderByWithRelationInput | reviewsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing reviews.
     */
    cursor?: reviewsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reviews.
     */
    skip?: number
    distinct?: ReviewsScalarFieldEnum | ReviewsScalarFieldEnum[]
  }

  /**
   * reviews create
   */
  export type reviewsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * The data needed to create a reviews.
     */
    data: XOR<reviewsCreateInput, reviewsUncheckedCreateInput>
  }

  /**
   * reviews createMany
   */
  export type reviewsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many reviews.
     */
    data: reviewsCreateManyInput | reviewsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * reviews createManyAndReturn
   */
  export type reviewsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * The data used to create many reviews.
     */
    data: reviewsCreateManyInput | reviewsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * reviews update
   */
  export type reviewsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * The data needed to update a reviews.
     */
    data: XOR<reviewsUpdateInput, reviewsUncheckedUpdateInput>
    /**
     * Choose, which reviews to update.
     */
    where: reviewsWhereUniqueInput
  }

  /**
   * reviews updateMany
   */
  export type reviewsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update reviews.
     */
    data: XOR<reviewsUpdateManyMutationInput, reviewsUncheckedUpdateManyInput>
    /**
     * Filter which reviews to update
     */
    where?: reviewsWhereInput
    /**
     * Limit how many reviews to update.
     */
    limit?: number
  }

  /**
   * reviews updateManyAndReturn
   */
  export type reviewsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * The data used to update reviews.
     */
    data: XOR<reviewsUpdateManyMutationInput, reviewsUncheckedUpdateManyInput>
    /**
     * Filter which reviews to update
     */
    where?: reviewsWhereInput
    /**
     * Limit how many reviews to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * reviews upsert
   */
  export type reviewsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * The filter to search for the reviews to update in case it exists.
     */
    where: reviewsWhereUniqueInput
    /**
     * In case the reviews found by the `where` argument doesn't exist, create a new reviews with this data.
     */
    create: XOR<reviewsCreateInput, reviewsUncheckedCreateInput>
    /**
     * In case the reviews was found with the provided `where` argument, update it with this data.
     */
    update: XOR<reviewsUpdateInput, reviewsUncheckedUpdateInput>
  }

  /**
   * reviews delete
   */
  export type reviewsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
    /**
     * Filter which reviews to delete.
     */
    where: reviewsWhereUniqueInput
  }

  /**
   * reviews deleteMany
   */
  export type reviewsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which reviews to delete
     */
    where?: reviewsWhereInput
    /**
     * Limit how many reviews to delete.
     */
    limit?: number
  }

  /**
   * reviews without action
   */
  export type reviewsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reviews
     */
    select?: reviewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reviews
     */
    omit?: reviewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UsersScalarFieldEnum: {
    id: 'id',
    role: 'role',
    full_name: 'full_name',
    email: 'email',
    password_hash: 'password_hash',
    profile_picture: 'profile_picture',
    is_verified: 'is_verified',
    created_at: 'created_at',
    updated_at: 'updated_at',
    reset_password_otp: 'reset_password_otp',
    verify_otp: 'verify_otp',
    verify_otp_expires_at: 'verify_otp_expires_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const TenantsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    company_name: 'company_name',
    address: 'address',
    phone_number: 'phone_number',
    logo: 'logo',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type TenantsScalarFieldEnum = (typeof TenantsScalarFieldEnum)[keyof typeof TenantsScalarFieldEnum]


  export const PropertiesScalarFieldEnum: {
    id: 'id',
    tenant_id: 'tenant_id',
    name: 'name',
    description: 'description',
    address: 'address',
    city: 'city',
    province: 'province',
    zip_code: 'zip_code',
    latitude: 'latitude',
    longitude: 'longitude',
    main_image: 'main_image',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at',
    property_category: 'property_category'
  };

  export type PropertiesScalarFieldEnum = (typeof PropertiesScalarFieldEnum)[keyof typeof PropertiesScalarFieldEnum]


  export const Property_imagesScalarFieldEnum: {
    id: 'id',
    property_id: 'property_id',
    image_url: 'image_url',
    created_at: 'created_at'
  };

  export type Property_imagesScalarFieldEnum = (typeof Property_imagesScalarFieldEnum)[keyof typeof Property_imagesScalarFieldEnum]


  export const RoomsScalarFieldEnum: {
    id: 'id',
    property_id: 'property_id',
    name: 'name',
    description: 'description',
    base_price: 'base_price',
    capacity: 'capacity',
    image: 'image',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at',
    total_rooms: 'total_rooms'
  };

  export type RoomsScalarFieldEnum = (typeof RoomsScalarFieldEnum)[keyof typeof RoomsScalarFieldEnum]


  export const Room_imagesScalarFieldEnum: {
    id: 'id',
    room_id: 'room_id',
    image_url: 'image_url',
    created_at: 'created_at'
  };

  export type Room_imagesScalarFieldEnum = (typeof Room_imagesScalarFieldEnum)[keyof typeof Room_imagesScalarFieldEnum]


  export const Room_availabilityScalarFieldEnum: {
    id: 'id',
    room_id: 'room_id',
    date: 'date',
    is_available: 'is_available',
    price_override: 'price_override',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Room_availabilityScalarFieldEnum = (typeof Room_availabilityScalarFieldEnum)[keyof typeof Room_availabilityScalarFieldEnum]


  export const Peak_season_ratesScalarFieldEnum: {
    id: 'id',
    property_id: 'property_id',
    room_id: 'room_id',
    start_date: 'start_date',
    end_date: 'end_date',
    price_change_type: 'price_change_type',
    price_change_value: 'price_change_value',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Peak_season_ratesScalarFieldEnum = (typeof Peak_season_ratesScalarFieldEnum)[keyof typeof Peak_season_ratesScalarFieldEnum]


  export const BookingsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    property_id: 'property_id',
    status: 'status',
    check_in_date: 'check_in_date',
    check_out_date: 'check_out_date',
    total_price: 'total_price',
    payment_deadline: 'payment_deadline',
    created_at: 'created_at',
    updated_at: 'updated_at',
    amount: 'amount',
    paid_at: 'paid_at',
    proof_image: 'proof_image'
  };

  export type BookingsScalarFieldEnum = (typeof BookingsScalarFieldEnum)[keyof typeof BookingsScalarFieldEnum]


  export const Booking_roomsScalarFieldEnum: {
    id: 'id',
    booking_id: 'booking_id',
    room_id: 'room_id',
    guests_count: 'guests_count',
    price_per_night: 'price_per_night',
    check_in_date: 'check_in_date',
    check_out_date: 'check_out_date',
    nights: 'nights',
    quantity: 'quantity',
    subtotal: 'subtotal',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Booking_roomsScalarFieldEnum = (typeof Booking_roomsScalarFieldEnum)[keyof typeof Booking_roomsScalarFieldEnum]


  export const ReviewsScalarFieldEnum: {
    id: 'id',
    booking_id: 'booking_id',
    user_id: 'user_id',
    property_id: 'property_id',
    comment: 'comment',
    tenant_reply: 'tenant_reply',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ReviewsScalarFieldEnum = (typeof ReviewsScalarFieldEnum)[keyof typeof ReviewsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'PropertyCategory'
   */
  export type EnumPropertyCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PropertyCategory'>
    


  /**
   * Reference to a field of type 'PropertyCategory[]'
   */
  export type ListEnumPropertyCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PropertyCategory[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'PriceChangeType'
   */
  export type EnumPriceChangeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PriceChangeType'>
    


  /**
   * Reference to a field of type 'PriceChangeType[]'
   */
  export type ListEnumPriceChangeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PriceChangeType[]'>
    


  /**
   * Reference to a field of type 'BookingStatus'
   */
  export type EnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus'>
    


  /**
   * Reference to a field of type 'BookingStatus[]'
   */
  export type ListEnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: StringFilter<"users"> | string
    role?: EnumRoleFilter<"users"> | $Enums.Role
    full_name?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    password_hash?: StringFilter<"users"> | string
    profile_picture?: StringNullableFilter<"users"> | string | null
    is_verified?: BoolFilter<"users"> | boolean
    created_at?: DateTimeFilter<"users"> | Date | string
    updated_at?: DateTimeFilter<"users"> | Date | string
    reset_password_otp?: StringNullableFilter<"users"> | string | null
    verify_otp?: StringNullableFilter<"users"> | string | null
    verify_otp_expires_at?: DateTimeNullableFilter<"users"> | Date | string | null
    bookings?: BookingsListRelationFilter
    reviews?: ReviewsListRelationFilter
    tenants?: TenantsListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    role?: SortOrder
    full_name?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    profile_picture?: SortOrderInput | SortOrder
    is_verified?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    reset_password_otp?: SortOrderInput | SortOrder
    verify_otp?: SortOrderInput | SortOrder
    verify_otp_expires_at?: SortOrderInput | SortOrder
    bookings?: bookingsOrderByRelationAggregateInput
    reviews?: reviewsOrderByRelationAggregateInput
    tenants?: tenantsOrderByRelationAggregateInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    role?: EnumRoleFilter<"users"> | $Enums.Role
    full_name?: StringFilter<"users"> | string
    password_hash?: StringFilter<"users"> | string
    profile_picture?: StringNullableFilter<"users"> | string | null
    is_verified?: BoolFilter<"users"> | boolean
    created_at?: DateTimeFilter<"users"> | Date | string
    updated_at?: DateTimeFilter<"users"> | Date | string
    reset_password_otp?: StringNullableFilter<"users"> | string | null
    verify_otp?: StringNullableFilter<"users"> | string | null
    verify_otp_expires_at?: DateTimeNullableFilter<"users"> | Date | string | null
    bookings?: BookingsListRelationFilter
    reviews?: ReviewsListRelationFilter
    tenants?: TenantsListRelationFilter
  }, "id" | "email">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    role?: SortOrder
    full_name?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    profile_picture?: SortOrderInput | SortOrder
    is_verified?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    reset_password_otp?: SortOrderInput | SortOrder
    verify_otp?: SortOrderInput | SortOrder
    verify_otp_expires_at?: SortOrderInput | SortOrder
    _count?: usersCountOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"users"> | string
    role?: EnumRoleWithAggregatesFilter<"users"> | $Enums.Role
    full_name?: StringWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    password_hash?: StringWithAggregatesFilter<"users"> | string
    profile_picture?: StringNullableWithAggregatesFilter<"users"> | string | null
    is_verified?: BoolWithAggregatesFilter<"users"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"users"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"users"> | Date | string
    reset_password_otp?: StringNullableWithAggregatesFilter<"users"> | string | null
    verify_otp?: StringNullableWithAggregatesFilter<"users"> | string | null
    verify_otp_expires_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
  }

  export type tenantsWhereInput = {
    AND?: tenantsWhereInput | tenantsWhereInput[]
    OR?: tenantsWhereInput[]
    NOT?: tenantsWhereInput | tenantsWhereInput[]
    id?: StringFilter<"tenants"> | string
    user_id?: StringFilter<"tenants"> | string
    company_name?: StringFilter<"tenants"> | string
    address?: StringFilter<"tenants"> | string
    phone_number?: StringFilter<"tenants"> | string
    logo?: StringNullableFilter<"tenants"> | string | null
    created_at?: DateTimeFilter<"tenants"> | Date | string
    updated_at?: DateTimeFilter<"tenants"> | Date | string
    properties?: PropertiesListRelationFilter
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type tenantsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    company_name?: SortOrder
    address?: SortOrder
    phone_number?: SortOrder
    logo?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    properties?: propertiesOrderByRelationAggregateInput
    user?: usersOrderByWithRelationInput
  }

  export type tenantsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    user_id?: string
    AND?: tenantsWhereInput | tenantsWhereInput[]
    OR?: tenantsWhereInput[]
    NOT?: tenantsWhereInput | tenantsWhereInput[]
    company_name?: StringFilter<"tenants"> | string
    address?: StringFilter<"tenants"> | string
    phone_number?: StringFilter<"tenants"> | string
    logo?: StringNullableFilter<"tenants"> | string | null
    created_at?: DateTimeFilter<"tenants"> | Date | string
    updated_at?: DateTimeFilter<"tenants"> | Date | string
    properties?: PropertiesListRelationFilter
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id" | "user_id">

  export type tenantsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    company_name?: SortOrder
    address?: SortOrder
    phone_number?: SortOrder
    logo?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: tenantsCountOrderByAggregateInput
    _max?: tenantsMaxOrderByAggregateInput
    _min?: tenantsMinOrderByAggregateInput
  }

  export type tenantsScalarWhereWithAggregatesInput = {
    AND?: tenantsScalarWhereWithAggregatesInput | tenantsScalarWhereWithAggregatesInput[]
    OR?: tenantsScalarWhereWithAggregatesInput[]
    NOT?: tenantsScalarWhereWithAggregatesInput | tenantsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"tenants"> | string
    user_id?: StringWithAggregatesFilter<"tenants"> | string
    company_name?: StringWithAggregatesFilter<"tenants"> | string
    address?: StringWithAggregatesFilter<"tenants"> | string
    phone_number?: StringWithAggregatesFilter<"tenants"> | string
    logo?: StringNullableWithAggregatesFilter<"tenants"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"tenants"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"tenants"> | Date | string
  }

  export type propertiesWhereInput = {
    AND?: propertiesWhereInput | propertiesWhereInput[]
    OR?: propertiesWhereInput[]
    NOT?: propertiesWhereInput | propertiesWhereInput[]
    id?: StringFilter<"properties"> | string
    tenant_id?: StringFilter<"properties"> | string
    name?: StringFilter<"properties"> | string
    description?: StringNullableFilter<"properties"> | string | null
    address?: StringFilter<"properties"> | string
    city?: StringFilter<"properties"> | string
    province?: StringFilter<"properties"> | string
    zip_code?: StringFilter<"properties"> | string
    latitude?: DecimalFilter<"properties"> | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFilter<"properties"> | Decimal | DecimalJsLike | number | string
    main_image?: StringNullableFilter<"properties"> | string | null
    created_at?: DateTimeFilter<"properties"> | Date | string
    updated_at?: DateTimeFilter<"properties"> | Date | string
    deleted_at?: DateTimeNullableFilter<"properties"> | Date | string | null
    property_category?: EnumPropertyCategoryFilter<"properties"> | $Enums.PropertyCategory
    bookings?: BookingsListRelationFilter
    peak_season_rates?: Peak_season_ratesListRelationFilter
    tenant?: XOR<TenantsScalarRelationFilter, tenantsWhereInput>
    property_images?: Property_imagesListRelationFilter
    reviews?: ReviewsListRelationFilter
    rooms?: RoomsListRelationFilter
  }

  export type propertiesOrderByWithRelationInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    address?: SortOrder
    city?: SortOrder
    province?: SortOrder
    zip_code?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    main_image?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    property_category?: SortOrder
    bookings?: bookingsOrderByRelationAggregateInput
    peak_season_rates?: peak_season_ratesOrderByRelationAggregateInput
    tenant?: tenantsOrderByWithRelationInput
    property_images?: property_imagesOrderByRelationAggregateInput
    reviews?: reviewsOrderByRelationAggregateInput
    rooms?: roomsOrderByRelationAggregateInput
  }

  export type propertiesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: propertiesWhereInput | propertiesWhereInput[]
    OR?: propertiesWhereInput[]
    NOT?: propertiesWhereInput | propertiesWhereInput[]
    tenant_id?: StringFilter<"properties"> | string
    name?: StringFilter<"properties"> | string
    description?: StringNullableFilter<"properties"> | string | null
    address?: StringFilter<"properties"> | string
    city?: StringFilter<"properties"> | string
    province?: StringFilter<"properties"> | string
    zip_code?: StringFilter<"properties"> | string
    latitude?: DecimalFilter<"properties"> | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFilter<"properties"> | Decimal | DecimalJsLike | number | string
    main_image?: StringNullableFilter<"properties"> | string | null
    created_at?: DateTimeFilter<"properties"> | Date | string
    updated_at?: DateTimeFilter<"properties"> | Date | string
    deleted_at?: DateTimeNullableFilter<"properties"> | Date | string | null
    property_category?: EnumPropertyCategoryFilter<"properties"> | $Enums.PropertyCategory
    bookings?: BookingsListRelationFilter
    peak_season_rates?: Peak_season_ratesListRelationFilter
    tenant?: XOR<TenantsScalarRelationFilter, tenantsWhereInput>
    property_images?: Property_imagesListRelationFilter
    reviews?: ReviewsListRelationFilter
    rooms?: RoomsListRelationFilter
  }, "id">

  export type propertiesOrderByWithAggregationInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    address?: SortOrder
    city?: SortOrder
    province?: SortOrder
    zip_code?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    main_image?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    property_category?: SortOrder
    _count?: propertiesCountOrderByAggregateInput
    _avg?: propertiesAvgOrderByAggregateInput
    _max?: propertiesMaxOrderByAggregateInput
    _min?: propertiesMinOrderByAggregateInput
    _sum?: propertiesSumOrderByAggregateInput
  }

  export type propertiesScalarWhereWithAggregatesInput = {
    AND?: propertiesScalarWhereWithAggregatesInput | propertiesScalarWhereWithAggregatesInput[]
    OR?: propertiesScalarWhereWithAggregatesInput[]
    NOT?: propertiesScalarWhereWithAggregatesInput | propertiesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"properties"> | string
    tenant_id?: StringWithAggregatesFilter<"properties"> | string
    name?: StringWithAggregatesFilter<"properties"> | string
    description?: StringNullableWithAggregatesFilter<"properties"> | string | null
    address?: StringWithAggregatesFilter<"properties"> | string
    city?: StringWithAggregatesFilter<"properties"> | string
    province?: StringWithAggregatesFilter<"properties"> | string
    zip_code?: StringWithAggregatesFilter<"properties"> | string
    latitude?: DecimalWithAggregatesFilter<"properties"> | Decimal | DecimalJsLike | number | string
    longitude?: DecimalWithAggregatesFilter<"properties"> | Decimal | DecimalJsLike | number | string
    main_image?: StringNullableWithAggregatesFilter<"properties"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"properties"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"properties"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"properties"> | Date | string | null
    property_category?: EnumPropertyCategoryWithAggregatesFilter<"properties"> | $Enums.PropertyCategory
  }

  export type property_imagesWhereInput = {
    AND?: property_imagesWhereInput | property_imagesWhereInput[]
    OR?: property_imagesWhereInput[]
    NOT?: property_imagesWhereInput | property_imagesWhereInput[]
    id?: StringFilter<"property_images"> | string
    property_id?: StringFilter<"property_images"> | string
    image_url?: StringFilter<"property_images"> | string
    created_at?: DateTimeFilter<"property_images"> | Date | string
    property?: XOR<PropertiesScalarRelationFilter, propertiesWhereInput>
  }

  export type property_imagesOrderByWithRelationInput = {
    id?: SortOrder
    property_id?: SortOrder
    image_url?: SortOrder
    created_at?: SortOrder
    property?: propertiesOrderByWithRelationInput
  }

  export type property_imagesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: property_imagesWhereInput | property_imagesWhereInput[]
    OR?: property_imagesWhereInput[]
    NOT?: property_imagesWhereInput | property_imagesWhereInput[]
    property_id?: StringFilter<"property_images"> | string
    image_url?: StringFilter<"property_images"> | string
    created_at?: DateTimeFilter<"property_images"> | Date | string
    property?: XOR<PropertiesScalarRelationFilter, propertiesWhereInput>
  }, "id">

  export type property_imagesOrderByWithAggregationInput = {
    id?: SortOrder
    property_id?: SortOrder
    image_url?: SortOrder
    created_at?: SortOrder
    _count?: property_imagesCountOrderByAggregateInput
    _max?: property_imagesMaxOrderByAggregateInput
    _min?: property_imagesMinOrderByAggregateInput
  }

  export type property_imagesScalarWhereWithAggregatesInput = {
    AND?: property_imagesScalarWhereWithAggregatesInput | property_imagesScalarWhereWithAggregatesInput[]
    OR?: property_imagesScalarWhereWithAggregatesInput[]
    NOT?: property_imagesScalarWhereWithAggregatesInput | property_imagesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"property_images"> | string
    property_id?: StringWithAggregatesFilter<"property_images"> | string
    image_url?: StringWithAggregatesFilter<"property_images"> | string
    created_at?: DateTimeWithAggregatesFilter<"property_images"> | Date | string
  }

  export type roomsWhereInput = {
    AND?: roomsWhereInput | roomsWhereInput[]
    OR?: roomsWhereInput[]
    NOT?: roomsWhereInput | roomsWhereInput[]
    id?: StringFilter<"rooms"> | string
    property_id?: StringFilter<"rooms"> | string
    name?: StringFilter<"rooms"> | string
    description?: StringNullableFilter<"rooms"> | string | null
    base_price?: DecimalFilter<"rooms"> | Decimal | DecimalJsLike | number | string
    capacity?: IntFilter<"rooms"> | number
    image?: StringNullableFilter<"rooms"> | string | null
    created_at?: DateTimeFilter<"rooms"> | Date | string
    updated_at?: DateTimeFilter<"rooms"> | Date | string
    deleted_at?: DateTimeNullableFilter<"rooms"> | Date | string | null
    total_rooms?: IntFilter<"rooms"> | number
    booking_rooms?: Booking_roomsListRelationFilter
    peak_season_rates?: Peak_season_ratesListRelationFilter
    room_availability?: Room_availabilityListRelationFilter
    room_images?: Room_imagesListRelationFilter
    property?: XOR<PropertiesScalarRelationFilter, propertiesWhereInput>
  }

  export type roomsOrderByWithRelationInput = {
    id?: SortOrder
    property_id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    base_price?: SortOrder
    capacity?: SortOrder
    image?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    total_rooms?: SortOrder
    booking_rooms?: booking_roomsOrderByRelationAggregateInput
    peak_season_rates?: peak_season_ratesOrderByRelationAggregateInput
    room_availability?: room_availabilityOrderByRelationAggregateInput
    room_images?: room_imagesOrderByRelationAggregateInput
    property?: propertiesOrderByWithRelationInput
  }

  export type roomsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: roomsWhereInput | roomsWhereInput[]
    OR?: roomsWhereInput[]
    NOT?: roomsWhereInput | roomsWhereInput[]
    property_id?: StringFilter<"rooms"> | string
    name?: StringFilter<"rooms"> | string
    description?: StringNullableFilter<"rooms"> | string | null
    base_price?: DecimalFilter<"rooms"> | Decimal | DecimalJsLike | number | string
    capacity?: IntFilter<"rooms"> | number
    image?: StringNullableFilter<"rooms"> | string | null
    created_at?: DateTimeFilter<"rooms"> | Date | string
    updated_at?: DateTimeFilter<"rooms"> | Date | string
    deleted_at?: DateTimeNullableFilter<"rooms"> | Date | string | null
    total_rooms?: IntFilter<"rooms"> | number
    booking_rooms?: Booking_roomsListRelationFilter
    peak_season_rates?: Peak_season_ratesListRelationFilter
    room_availability?: Room_availabilityListRelationFilter
    room_images?: Room_imagesListRelationFilter
    property?: XOR<PropertiesScalarRelationFilter, propertiesWhereInput>
  }, "id">

  export type roomsOrderByWithAggregationInput = {
    id?: SortOrder
    property_id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    base_price?: SortOrder
    capacity?: SortOrder
    image?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    total_rooms?: SortOrder
    _count?: roomsCountOrderByAggregateInput
    _avg?: roomsAvgOrderByAggregateInput
    _max?: roomsMaxOrderByAggregateInput
    _min?: roomsMinOrderByAggregateInput
    _sum?: roomsSumOrderByAggregateInput
  }

  export type roomsScalarWhereWithAggregatesInput = {
    AND?: roomsScalarWhereWithAggregatesInput | roomsScalarWhereWithAggregatesInput[]
    OR?: roomsScalarWhereWithAggregatesInput[]
    NOT?: roomsScalarWhereWithAggregatesInput | roomsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"rooms"> | string
    property_id?: StringWithAggregatesFilter<"rooms"> | string
    name?: StringWithAggregatesFilter<"rooms"> | string
    description?: StringNullableWithAggregatesFilter<"rooms"> | string | null
    base_price?: DecimalWithAggregatesFilter<"rooms"> | Decimal | DecimalJsLike | number | string
    capacity?: IntWithAggregatesFilter<"rooms"> | number
    image?: StringNullableWithAggregatesFilter<"rooms"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"rooms"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"rooms"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"rooms"> | Date | string | null
    total_rooms?: IntWithAggregatesFilter<"rooms"> | number
  }

  export type room_imagesWhereInput = {
    AND?: room_imagesWhereInput | room_imagesWhereInput[]
    OR?: room_imagesWhereInput[]
    NOT?: room_imagesWhereInput | room_imagesWhereInput[]
    id?: StringFilter<"room_images"> | string
    room_id?: StringFilter<"room_images"> | string
    image_url?: StringFilter<"room_images"> | string
    created_at?: DateTimeFilter<"room_images"> | Date | string
    room?: XOR<RoomsScalarRelationFilter, roomsWhereInput>
  }

  export type room_imagesOrderByWithRelationInput = {
    id?: SortOrder
    room_id?: SortOrder
    image_url?: SortOrder
    created_at?: SortOrder
    room?: roomsOrderByWithRelationInput
  }

  export type room_imagesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: room_imagesWhereInput | room_imagesWhereInput[]
    OR?: room_imagesWhereInput[]
    NOT?: room_imagesWhereInput | room_imagesWhereInput[]
    room_id?: StringFilter<"room_images"> | string
    image_url?: StringFilter<"room_images"> | string
    created_at?: DateTimeFilter<"room_images"> | Date | string
    room?: XOR<RoomsScalarRelationFilter, roomsWhereInput>
  }, "id">

  export type room_imagesOrderByWithAggregationInput = {
    id?: SortOrder
    room_id?: SortOrder
    image_url?: SortOrder
    created_at?: SortOrder
    _count?: room_imagesCountOrderByAggregateInput
    _max?: room_imagesMaxOrderByAggregateInput
    _min?: room_imagesMinOrderByAggregateInput
  }

  export type room_imagesScalarWhereWithAggregatesInput = {
    AND?: room_imagesScalarWhereWithAggregatesInput | room_imagesScalarWhereWithAggregatesInput[]
    OR?: room_imagesScalarWhereWithAggregatesInput[]
    NOT?: room_imagesScalarWhereWithAggregatesInput | room_imagesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"room_images"> | string
    room_id?: StringWithAggregatesFilter<"room_images"> | string
    image_url?: StringWithAggregatesFilter<"room_images"> | string
    created_at?: DateTimeWithAggregatesFilter<"room_images"> | Date | string
  }

  export type room_availabilityWhereInput = {
    AND?: room_availabilityWhereInput | room_availabilityWhereInput[]
    OR?: room_availabilityWhereInput[]
    NOT?: room_availabilityWhereInput | room_availabilityWhereInput[]
    id?: StringFilter<"room_availability"> | string
    room_id?: StringFilter<"room_availability"> | string
    date?: DateTimeFilter<"room_availability"> | Date | string
    is_available?: BoolFilter<"room_availability"> | boolean
    price_override?: DecimalNullableFilter<"room_availability"> | Decimal | DecimalJsLike | number | string | null
    created_at?: DateTimeFilter<"room_availability"> | Date | string
    updated_at?: DateTimeFilter<"room_availability"> | Date | string
    room?: XOR<RoomsScalarRelationFilter, roomsWhereInput>
  }

  export type room_availabilityOrderByWithRelationInput = {
    id?: SortOrder
    room_id?: SortOrder
    date?: SortOrder
    is_available?: SortOrder
    price_override?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    room?: roomsOrderByWithRelationInput
  }

  export type room_availabilityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    room_id_date?: room_availabilityRoom_idDateCompoundUniqueInput
    AND?: room_availabilityWhereInput | room_availabilityWhereInput[]
    OR?: room_availabilityWhereInput[]
    NOT?: room_availabilityWhereInput | room_availabilityWhereInput[]
    room_id?: StringFilter<"room_availability"> | string
    date?: DateTimeFilter<"room_availability"> | Date | string
    is_available?: BoolFilter<"room_availability"> | boolean
    price_override?: DecimalNullableFilter<"room_availability"> | Decimal | DecimalJsLike | number | string | null
    created_at?: DateTimeFilter<"room_availability"> | Date | string
    updated_at?: DateTimeFilter<"room_availability"> | Date | string
    room?: XOR<RoomsScalarRelationFilter, roomsWhereInput>
  }, "id" | "room_id_date">

  export type room_availabilityOrderByWithAggregationInput = {
    id?: SortOrder
    room_id?: SortOrder
    date?: SortOrder
    is_available?: SortOrder
    price_override?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: room_availabilityCountOrderByAggregateInput
    _avg?: room_availabilityAvgOrderByAggregateInput
    _max?: room_availabilityMaxOrderByAggregateInput
    _min?: room_availabilityMinOrderByAggregateInput
    _sum?: room_availabilitySumOrderByAggregateInput
  }

  export type room_availabilityScalarWhereWithAggregatesInput = {
    AND?: room_availabilityScalarWhereWithAggregatesInput | room_availabilityScalarWhereWithAggregatesInput[]
    OR?: room_availabilityScalarWhereWithAggregatesInput[]
    NOT?: room_availabilityScalarWhereWithAggregatesInput | room_availabilityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"room_availability"> | string
    room_id?: StringWithAggregatesFilter<"room_availability"> | string
    date?: DateTimeWithAggregatesFilter<"room_availability"> | Date | string
    is_available?: BoolWithAggregatesFilter<"room_availability"> | boolean
    price_override?: DecimalNullableWithAggregatesFilter<"room_availability"> | Decimal | DecimalJsLike | number | string | null
    created_at?: DateTimeWithAggregatesFilter<"room_availability"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"room_availability"> | Date | string
  }

  export type peak_season_ratesWhereInput = {
    AND?: peak_season_ratesWhereInput | peak_season_ratesWhereInput[]
    OR?: peak_season_ratesWhereInput[]
    NOT?: peak_season_ratesWhereInput | peak_season_ratesWhereInput[]
    id?: StringFilter<"peak_season_rates"> | string
    property_id?: StringFilter<"peak_season_rates"> | string
    room_id?: StringFilter<"peak_season_rates"> | string
    start_date?: DateTimeFilter<"peak_season_rates"> | Date | string
    end_date?: DateTimeFilter<"peak_season_rates"> | Date | string
    price_change_type?: EnumPriceChangeTypeFilter<"peak_season_rates"> | $Enums.PriceChangeType
    price_change_value?: DecimalFilter<"peak_season_rates"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFilter<"peak_season_rates"> | Date | string
    updated_at?: DateTimeFilter<"peak_season_rates"> | Date | string
    property?: XOR<PropertiesScalarRelationFilter, propertiesWhereInput>
    room?: XOR<RoomsScalarRelationFilter, roomsWhereInput>
  }

  export type peak_season_ratesOrderByWithRelationInput = {
    id?: SortOrder
    property_id?: SortOrder
    room_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    price_change_type?: SortOrder
    price_change_value?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    property?: propertiesOrderByWithRelationInput
    room?: roomsOrderByWithRelationInput
  }

  export type peak_season_ratesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: peak_season_ratesWhereInput | peak_season_ratesWhereInput[]
    OR?: peak_season_ratesWhereInput[]
    NOT?: peak_season_ratesWhereInput | peak_season_ratesWhereInput[]
    property_id?: StringFilter<"peak_season_rates"> | string
    room_id?: StringFilter<"peak_season_rates"> | string
    start_date?: DateTimeFilter<"peak_season_rates"> | Date | string
    end_date?: DateTimeFilter<"peak_season_rates"> | Date | string
    price_change_type?: EnumPriceChangeTypeFilter<"peak_season_rates"> | $Enums.PriceChangeType
    price_change_value?: DecimalFilter<"peak_season_rates"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFilter<"peak_season_rates"> | Date | string
    updated_at?: DateTimeFilter<"peak_season_rates"> | Date | string
    property?: XOR<PropertiesScalarRelationFilter, propertiesWhereInput>
    room?: XOR<RoomsScalarRelationFilter, roomsWhereInput>
  }, "id">

  export type peak_season_ratesOrderByWithAggregationInput = {
    id?: SortOrder
    property_id?: SortOrder
    room_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    price_change_type?: SortOrder
    price_change_value?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: peak_season_ratesCountOrderByAggregateInput
    _avg?: peak_season_ratesAvgOrderByAggregateInput
    _max?: peak_season_ratesMaxOrderByAggregateInput
    _min?: peak_season_ratesMinOrderByAggregateInput
    _sum?: peak_season_ratesSumOrderByAggregateInput
  }

  export type peak_season_ratesScalarWhereWithAggregatesInput = {
    AND?: peak_season_ratesScalarWhereWithAggregatesInput | peak_season_ratesScalarWhereWithAggregatesInput[]
    OR?: peak_season_ratesScalarWhereWithAggregatesInput[]
    NOT?: peak_season_ratesScalarWhereWithAggregatesInput | peak_season_ratesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"peak_season_rates"> | string
    property_id?: StringWithAggregatesFilter<"peak_season_rates"> | string
    room_id?: StringWithAggregatesFilter<"peak_season_rates"> | string
    start_date?: DateTimeWithAggregatesFilter<"peak_season_rates"> | Date | string
    end_date?: DateTimeWithAggregatesFilter<"peak_season_rates"> | Date | string
    price_change_type?: EnumPriceChangeTypeWithAggregatesFilter<"peak_season_rates"> | $Enums.PriceChangeType
    price_change_value?: DecimalWithAggregatesFilter<"peak_season_rates"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeWithAggregatesFilter<"peak_season_rates"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"peak_season_rates"> | Date | string
  }

  export type bookingsWhereInput = {
    AND?: bookingsWhereInput | bookingsWhereInput[]
    OR?: bookingsWhereInput[]
    NOT?: bookingsWhereInput | bookingsWhereInput[]
    id?: StringFilter<"bookings"> | string
    user_id?: StringFilter<"bookings"> | string
    property_id?: StringFilter<"bookings"> | string
    status?: EnumBookingStatusFilter<"bookings"> | $Enums.BookingStatus
    check_in_date?: DateTimeFilter<"bookings"> | Date | string
    check_out_date?: DateTimeFilter<"bookings"> | Date | string
    total_price?: DecimalFilter<"bookings"> | Decimal | DecimalJsLike | number | string
    payment_deadline?: DateTimeFilter<"bookings"> | Date | string
    created_at?: DateTimeFilter<"bookings"> | Date | string
    updated_at?: DateTimeFilter<"bookings"> | Date | string
    amount?: DecimalFilter<"bookings"> | Decimal | DecimalJsLike | number | string
    paid_at?: DateTimeNullableFilter<"bookings"> | Date | string | null
    proof_image?: StringNullableFilter<"bookings"> | string | null
    booking_rooms?: Booking_roomsListRelationFilter
    property?: XOR<PropertiesScalarRelationFilter, propertiesWhereInput>
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
    reviews?: ReviewsListRelationFilter
  }

  export type bookingsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    property_id?: SortOrder
    status?: SortOrder
    check_in_date?: SortOrder
    check_out_date?: SortOrder
    total_price?: SortOrder
    payment_deadline?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    amount?: SortOrder
    paid_at?: SortOrderInput | SortOrder
    proof_image?: SortOrderInput | SortOrder
    booking_rooms?: booking_roomsOrderByRelationAggregateInput
    property?: propertiesOrderByWithRelationInput
    user?: usersOrderByWithRelationInput
    reviews?: reviewsOrderByRelationAggregateInput
  }

  export type bookingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: bookingsWhereInput | bookingsWhereInput[]
    OR?: bookingsWhereInput[]
    NOT?: bookingsWhereInput | bookingsWhereInput[]
    user_id?: StringFilter<"bookings"> | string
    property_id?: StringFilter<"bookings"> | string
    status?: EnumBookingStatusFilter<"bookings"> | $Enums.BookingStatus
    check_in_date?: DateTimeFilter<"bookings"> | Date | string
    check_out_date?: DateTimeFilter<"bookings"> | Date | string
    total_price?: DecimalFilter<"bookings"> | Decimal | DecimalJsLike | number | string
    payment_deadline?: DateTimeFilter<"bookings"> | Date | string
    created_at?: DateTimeFilter<"bookings"> | Date | string
    updated_at?: DateTimeFilter<"bookings"> | Date | string
    amount?: DecimalFilter<"bookings"> | Decimal | DecimalJsLike | number | string
    paid_at?: DateTimeNullableFilter<"bookings"> | Date | string | null
    proof_image?: StringNullableFilter<"bookings"> | string | null
    booking_rooms?: Booking_roomsListRelationFilter
    property?: XOR<PropertiesScalarRelationFilter, propertiesWhereInput>
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
    reviews?: ReviewsListRelationFilter
  }, "id">

  export type bookingsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    property_id?: SortOrder
    status?: SortOrder
    check_in_date?: SortOrder
    check_out_date?: SortOrder
    total_price?: SortOrder
    payment_deadline?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    amount?: SortOrder
    paid_at?: SortOrderInput | SortOrder
    proof_image?: SortOrderInput | SortOrder
    _count?: bookingsCountOrderByAggregateInput
    _avg?: bookingsAvgOrderByAggregateInput
    _max?: bookingsMaxOrderByAggregateInput
    _min?: bookingsMinOrderByAggregateInput
    _sum?: bookingsSumOrderByAggregateInput
  }

  export type bookingsScalarWhereWithAggregatesInput = {
    AND?: bookingsScalarWhereWithAggregatesInput | bookingsScalarWhereWithAggregatesInput[]
    OR?: bookingsScalarWhereWithAggregatesInput[]
    NOT?: bookingsScalarWhereWithAggregatesInput | bookingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"bookings"> | string
    user_id?: StringWithAggregatesFilter<"bookings"> | string
    property_id?: StringWithAggregatesFilter<"bookings"> | string
    status?: EnumBookingStatusWithAggregatesFilter<"bookings"> | $Enums.BookingStatus
    check_in_date?: DateTimeWithAggregatesFilter<"bookings"> | Date | string
    check_out_date?: DateTimeWithAggregatesFilter<"bookings"> | Date | string
    total_price?: DecimalWithAggregatesFilter<"bookings"> | Decimal | DecimalJsLike | number | string
    payment_deadline?: DateTimeWithAggregatesFilter<"bookings"> | Date | string
    created_at?: DateTimeWithAggregatesFilter<"bookings"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"bookings"> | Date | string
    amount?: DecimalWithAggregatesFilter<"bookings"> | Decimal | DecimalJsLike | number | string
    paid_at?: DateTimeNullableWithAggregatesFilter<"bookings"> | Date | string | null
    proof_image?: StringNullableWithAggregatesFilter<"bookings"> | string | null
  }

  export type booking_roomsWhereInput = {
    AND?: booking_roomsWhereInput | booking_roomsWhereInput[]
    OR?: booking_roomsWhereInput[]
    NOT?: booking_roomsWhereInput | booking_roomsWhereInput[]
    id?: StringFilter<"booking_rooms"> | string
    booking_id?: StringFilter<"booking_rooms"> | string
    room_id?: StringFilter<"booking_rooms"> | string
    guests_count?: IntFilter<"booking_rooms"> | number
    price_per_night?: DecimalFilter<"booking_rooms"> | Decimal | DecimalJsLike | number | string
    check_in_date?: DateTimeFilter<"booking_rooms"> | Date | string
    check_out_date?: DateTimeFilter<"booking_rooms"> | Date | string
    nights?: IntFilter<"booking_rooms"> | number
    quantity?: IntFilter<"booking_rooms"> | number
    subtotal?: DecimalFilter<"booking_rooms"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFilter<"booking_rooms"> | Date | string
    updated_at?: DateTimeFilter<"booking_rooms"> | Date | string
    booking?: XOR<BookingsScalarRelationFilter, bookingsWhereInput>
    room?: XOR<RoomsScalarRelationFilter, roomsWhereInput>
  }

  export type booking_roomsOrderByWithRelationInput = {
    id?: SortOrder
    booking_id?: SortOrder
    room_id?: SortOrder
    guests_count?: SortOrder
    price_per_night?: SortOrder
    check_in_date?: SortOrder
    check_out_date?: SortOrder
    nights?: SortOrder
    quantity?: SortOrder
    subtotal?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    booking?: bookingsOrderByWithRelationInput
    room?: roomsOrderByWithRelationInput
  }

  export type booking_roomsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: booking_roomsWhereInput | booking_roomsWhereInput[]
    OR?: booking_roomsWhereInput[]
    NOT?: booking_roomsWhereInput | booking_roomsWhereInput[]
    booking_id?: StringFilter<"booking_rooms"> | string
    room_id?: StringFilter<"booking_rooms"> | string
    guests_count?: IntFilter<"booking_rooms"> | number
    price_per_night?: DecimalFilter<"booking_rooms"> | Decimal | DecimalJsLike | number | string
    check_in_date?: DateTimeFilter<"booking_rooms"> | Date | string
    check_out_date?: DateTimeFilter<"booking_rooms"> | Date | string
    nights?: IntFilter<"booking_rooms"> | number
    quantity?: IntFilter<"booking_rooms"> | number
    subtotal?: DecimalFilter<"booking_rooms"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFilter<"booking_rooms"> | Date | string
    updated_at?: DateTimeFilter<"booking_rooms"> | Date | string
    booking?: XOR<BookingsScalarRelationFilter, bookingsWhereInput>
    room?: XOR<RoomsScalarRelationFilter, roomsWhereInput>
  }, "id">

  export type booking_roomsOrderByWithAggregationInput = {
    id?: SortOrder
    booking_id?: SortOrder
    room_id?: SortOrder
    guests_count?: SortOrder
    price_per_night?: SortOrder
    check_in_date?: SortOrder
    check_out_date?: SortOrder
    nights?: SortOrder
    quantity?: SortOrder
    subtotal?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: booking_roomsCountOrderByAggregateInput
    _avg?: booking_roomsAvgOrderByAggregateInput
    _max?: booking_roomsMaxOrderByAggregateInput
    _min?: booking_roomsMinOrderByAggregateInput
    _sum?: booking_roomsSumOrderByAggregateInput
  }

  export type booking_roomsScalarWhereWithAggregatesInput = {
    AND?: booking_roomsScalarWhereWithAggregatesInput | booking_roomsScalarWhereWithAggregatesInput[]
    OR?: booking_roomsScalarWhereWithAggregatesInput[]
    NOT?: booking_roomsScalarWhereWithAggregatesInput | booking_roomsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"booking_rooms"> | string
    booking_id?: StringWithAggregatesFilter<"booking_rooms"> | string
    room_id?: StringWithAggregatesFilter<"booking_rooms"> | string
    guests_count?: IntWithAggregatesFilter<"booking_rooms"> | number
    price_per_night?: DecimalWithAggregatesFilter<"booking_rooms"> | Decimal | DecimalJsLike | number | string
    check_in_date?: DateTimeWithAggregatesFilter<"booking_rooms"> | Date | string
    check_out_date?: DateTimeWithAggregatesFilter<"booking_rooms"> | Date | string
    nights?: IntWithAggregatesFilter<"booking_rooms"> | number
    quantity?: IntWithAggregatesFilter<"booking_rooms"> | number
    subtotal?: DecimalWithAggregatesFilter<"booking_rooms"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeWithAggregatesFilter<"booking_rooms"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"booking_rooms"> | Date | string
  }

  export type reviewsWhereInput = {
    AND?: reviewsWhereInput | reviewsWhereInput[]
    OR?: reviewsWhereInput[]
    NOT?: reviewsWhereInput | reviewsWhereInput[]
    id?: StringFilter<"reviews"> | string
    booking_id?: StringFilter<"reviews"> | string
    user_id?: StringFilter<"reviews"> | string
    property_id?: StringFilter<"reviews"> | string
    comment?: StringNullableFilter<"reviews"> | string | null
    tenant_reply?: StringNullableFilter<"reviews"> | string | null
    created_at?: DateTimeFilter<"reviews"> | Date | string
    updated_at?: DateTimeFilter<"reviews"> | Date | string
    booking?: XOR<BookingsScalarRelationFilter, bookingsWhereInput>
    property?: XOR<PropertiesScalarRelationFilter, propertiesWhereInput>
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type reviewsOrderByWithRelationInput = {
    id?: SortOrder
    booking_id?: SortOrder
    user_id?: SortOrder
    property_id?: SortOrder
    comment?: SortOrderInput | SortOrder
    tenant_reply?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    booking?: bookingsOrderByWithRelationInput
    property?: propertiesOrderByWithRelationInput
    user?: usersOrderByWithRelationInput
  }

  export type reviewsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: reviewsWhereInput | reviewsWhereInput[]
    OR?: reviewsWhereInput[]
    NOT?: reviewsWhereInput | reviewsWhereInput[]
    booking_id?: StringFilter<"reviews"> | string
    user_id?: StringFilter<"reviews"> | string
    property_id?: StringFilter<"reviews"> | string
    comment?: StringNullableFilter<"reviews"> | string | null
    tenant_reply?: StringNullableFilter<"reviews"> | string | null
    created_at?: DateTimeFilter<"reviews"> | Date | string
    updated_at?: DateTimeFilter<"reviews"> | Date | string
    booking?: XOR<BookingsScalarRelationFilter, bookingsWhereInput>
    property?: XOR<PropertiesScalarRelationFilter, propertiesWhereInput>
    user?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "id">

  export type reviewsOrderByWithAggregationInput = {
    id?: SortOrder
    booking_id?: SortOrder
    user_id?: SortOrder
    property_id?: SortOrder
    comment?: SortOrderInput | SortOrder
    tenant_reply?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: reviewsCountOrderByAggregateInput
    _max?: reviewsMaxOrderByAggregateInput
    _min?: reviewsMinOrderByAggregateInput
  }

  export type reviewsScalarWhereWithAggregatesInput = {
    AND?: reviewsScalarWhereWithAggregatesInput | reviewsScalarWhereWithAggregatesInput[]
    OR?: reviewsScalarWhereWithAggregatesInput[]
    NOT?: reviewsScalarWhereWithAggregatesInput | reviewsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"reviews"> | string
    booking_id?: StringWithAggregatesFilter<"reviews"> | string
    user_id?: StringWithAggregatesFilter<"reviews"> | string
    property_id?: StringWithAggregatesFilter<"reviews"> | string
    comment?: StringNullableWithAggregatesFilter<"reviews"> | string | null
    tenant_reply?: StringNullableWithAggregatesFilter<"reviews"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"reviews"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"reviews"> | Date | string
  }

  export type usersCreateInput = {
    id?: string
    role: $Enums.Role
    full_name: string
    email: string
    password_hash: string
    profile_picture?: string | null
    is_verified: boolean
    created_at?: Date | string
    updated_at?: Date | string
    reset_password_otp?: string | null
    verify_otp?: string | null
    verify_otp_expires_at?: Date | string | null
    bookings?: bookingsCreateNestedManyWithoutUserInput
    reviews?: reviewsCreateNestedManyWithoutUserInput
    tenants?: tenantsCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateInput = {
    id?: string
    role: $Enums.Role
    full_name: string
    email: string
    password_hash: string
    profile_picture?: string | null
    is_verified: boolean
    created_at?: Date | string
    updated_at?: Date | string
    reset_password_otp?: string | null
    verify_otp?: string | null
    verify_otp_expires_at?: Date | string | null
    bookings?: bookingsUncheckedCreateNestedManyWithoutUserInput
    reviews?: reviewsUncheckedCreateNestedManyWithoutUserInput
    tenants?: tenantsUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reset_password_otp?: NullableStringFieldUpdateOperationsInput | string | null
    verify_otp?: NullableStringFieldUpdateOperationsInput | string | null
    verify_otp_expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bookings?: bookingsUpdateManyWithoutUserNestedInput
    reviews?: reviewsUpdateManyWithoutUserNestedInput
    tenants?: tenantsUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reset_password_otp?: NullableStringFieldUpdateOperationsInput | string | null
    verify_otp?: NullableStringFieldUpdateOperationsInput | string | null
    verify_otp_expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bookings?: bookingsUncheckedUpdateManyWithoutUserNestedInput
    reviews?: reviewsUncheckedUpdateManyWithoutUserNestedInput
    tenants?: tenantsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type usersCreateManyInput = {
    id?: string
    role: $Enums.Role
    full_name: string
    email: string
    password_hash: string
    profile_picture?: string | null
    is_verified: boolean
    created_at?: Date | string
    updated_at?: Date | string
    reset_password_otp?: string | null
    verify_otp?: string | null
    verify_otp_expires_at?: Date | string | null
  }

  export type usersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reset_password_otp?: NullableStringFieldUpdateOperationsInput | string | null
    verify_otp?: NullableStringFieldUpdateOperationsInput | string | null
    verify_otp_expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reset_password_otp?: NullableStringFieldUpdateOperationsInput | string | null
    verify_otp?: NullableStringFieldUpdateOperationsInput | string | null
    verify_otp_expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type tenantsCreateInput = {
    id?: string
    company_name: string
    address: string
    phone_number: string
    logo?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    properties?: propertiesCreateNestedManyWithoutTenantInput
    user: usersCreateNestedOneWithoutTenantsInput
  }

  export type tenantsUncheckedCreateInput = {
    id?: string
    user_id: string
    company_name: string
    address: string
    phone_number: string
    logo?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    properties?: propertiesUncheckedCreateNestedManyWithoutTenantInput
  }

  export type tenantsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    company_name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    properties?: propertiesUpdateManyWithoutTenantNestedInput
    user?: usersUpdateOneRequiredWithoutTenantsNestedInput
  }

  export type tenantsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    company_name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    properties?: propertiesUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type tenantsCreateManyInput = {
    id?: string
    user_id: string
    company_name: string
    address: string
    phone_number: string
    logo?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type tenantsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    company_name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tenantsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    company_name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type propertiesCreateInput = {
    id?: string
    name: string
    description?: string | null
    address: string
    city: string
    province: string
    zip_code: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    main_image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    property_category: $Enums.PropertyCategory
    bookings?: bookingsCreateNestedManyWithoutPropertyInput
    peak_season_rates?: peak_season_ratesCreateNestedManyWithoutPropertyInput
    tenant: tenantsCreateNestedOneWithoutPropertiesInput
    property_images?: property_imagesCreateNestedManyWithoutPropertyInput
    reviews?: reviewsCreateNestedManyWithoutPropertyInput
    rooms?: roomsCreateNestedManyWithoutPropertyInput
  }

  export type propertiesUncheckedCreateInput = {
    id?: string
    tenant_id: string
    name: string
    description?: string | null
    address: string
    city: string
    province: string
    zip_code: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    main_image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    property_category: $Enums.PropertyCategory
    bookings?: bookingsUncheckedCreateNestedManyWithoutPropertyInput
    peak_season_rates?: peak_season_ratesUncheckedCreateNestedManyWithoutPropertyInput
    property_images?: property_imagesUncheckedCreateNestedManyWithoutPropertyInput
    reviews?: reviewsUncheckedCreateNestedManyWithoutPropertyInput
    rooms?: roomsUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type propertiesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    main_image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    property_category?: EnumPropertyCategoryFieldUpdateOperationsInput | $Enums.PropertyCategory
    bookings?: bookingsUpdateManyWithoutPropertyNestedInput
    peak_season_rates?: peak_season_ratesUpdateManyWithoutPropertyNestedInput
    tenant?: tenantsUpdateOneRequiredWithoutPropertiesNestedInput
    property_images?: property_imagesUpdateManyWithoutPropertyNestedInput
    reviews?: reviewsUpdateManyWithoutPropertyNestedInput
    rooms?: roomsUpdateManyWithoutPropertyNestedInput
  }

  export type propertiesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    main_image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    property_category?: EnumPropertyCategoryFieldUpdateOperationsInput | $Enums.PropertyCategory
    bookings?: bookingsUncheckedUpdateManyWithoutPropertyNestedInput
    peak_season_rates?: peak_season_ratesUncheckedUpdateManyWithoutPropertyNestedInput
    property_images?: property_imagesUncheckedUpdateManyWithoutPropertyNestedInput
    reviews?: reviewsUncheckedUpdateManyWithoutPropertyNestedInput
    rooms?: roomsUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type propertiesCreateManyInput = {
    id?: string
    tenant_id: string
    name: string
    description?: string | null
    address: string
    city: string
    province: string
    zip_code: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    main_image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    property_category: $Enums.PropertyCategory
  }

  export type propertiesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    main_image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    property_category?: EnumPropertyCategoryFieldUpdateOperationsInput | $Enums.PropertyCategory
  }

  export type propertiesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    main_image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    property_category?: EnumPropertyCategoryFieldUpdateOperationsInput | $Enums.PropertyCategory
  }

  export type property_imagesCreateInput = {
    id?: string
    image_url: string
    created_at?: Date | string
    property: propertiesCreateNestedOneWithoutProperty_imagesInput
  }

  export type property_imagesUncheckedCreateInput = {
    id?: string
    property_id: string
    image_url: string
    created_at?: Date | string
  }

  export type property_imagesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: propertiesUpdateOneRequiredWithoutProperty_imagesNestedInput
  }

  export type property_imagesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    property_id?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type property_imagesCreateManyInput = {
    id?: string
    property_id: string
    image_url: string
    created_at?: Date | string
  }

  export type property_imagesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type property_imagesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    property_id?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type roomsCreateInput = {
    id?: string
    name: string
    description?: string | null
    base_price: Decimal | DecimalJsLike | number | string
    capacity: number
    image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    total_rooms: number
    booking_rooms?: booking_roomsCreateNestedManyWithoutRoomInput
    peak_season_rates?: peak_season_ratesCreateNestedManyWithoutRoomInput
    room_availability?: room_availabilityCreateNestedManyWithoutRoomInput
    room_images?: room_imagesCreateNestedManyWithoutRoomInput
    property: propertiesCreateNestedOneWithoutRoomsInput
  }

  export type roomsUncheckedCreateInput = {
    id?: string
    property_id: string
    name: string
    description?: string | null
    base_price: Decimal | DecimalJsLike | number | string
    capacity: number
    image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    total_rooms: number
    booking_rooms?: booking_roomsUncheckedCreateNestedManyWithoutRoomInput
    peak_season_rates?: peak_season_ratesUncheckedCreateNestedManyWithoutRoomInput
    room_availability?: room_availabilityUncheckedCreateNestedManyWithoutRoomInput
    room_images?: room_imagesUncheckedCreateNestedManyWithoutRoomInput
  }

  export type roomsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    base_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capacity?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_rooms?: IntFieldUpdateOperationsInput | number
    booking_rooms?: booking_roomsUpdateManyWithoutRoomNestedInput
    peak_season_rates?: peak_season_ratesUpdateManyWithoutRoomNestedInput
    room_availability?: room_availabilityUpdateManyWithoutRoomNestedInput
    room_images?: room_imagesUpdateManyWithoutRoomNestedInput
    property?: propertiesUpdateOneRequiredWithoutRoomsNestedInput
  }

  export type roomsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    property_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    base_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capacity?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_rooms?: IntFieldUpdateOperationsInput | number
    booking_rooms?: booking_roomsUncheckedUpdateManyWithoutRoomNestedInput
    peak_season_rates?: peak_season_ratesUncheckedUpdateManyWithoutRoomNestedInput
    room_availability?: room_availabilityUncheckedUpdateManyWithoutRoomNestedInput
    room_images?: room_imagesUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type roomsCreateManyInput = {
    id?: string
    property_id: string
    name: string
    description?: string | null
    base_price: Decimal | DecimalJsLike | number | string
    capacity: number
    image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    total_rooms: number
  }

  export type roomsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    base_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capacity?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_rooms?: IntFieldUpdateOperationsInput | number
  }

  export type roomsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    property_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    base_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capacity?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_rooms?: IntFieldUpdateOperationsInput | number
  }

  export type room_imagesCreateInput = {
    id?: string
    image_url: string
    created_at?: Date | string
    room: roomsCreateNestedOneWithoutRoom_imagesInput
  }

  export type room_imagesUncheckedCreateInput = {
    id?: string
    room_id: string
    image_url: string
    created_at?: Date | string
  }

  export type room_imagesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: roomsUpdateOneRequiredWithoutRoom_imagesNestedInput
  }

  export type room_imagesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_id?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type room_imagesCreateManyInput = {
    id?: string
    room_id: string
    image_url: string
    created_at?: Date | string
  }

  export type room_imagesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type room_imagesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_id?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type room_availabilityCreateInput = {
    id?: string
    date: Date | string
    is_available: boolean
    price_override?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string
    updated_at?: Date | string
    room: roomsCreateNestedOneWithoutRoom_availabilityInput
  }

  export type room_availabilityUncheckedCreateInput = {
    id?: string
    room_id: string
    date: Date | string
    is_available: boolean
    price_override?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type room_availabilityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    is_available?: BoolFieldUpdateOperationsInput | boolean
    price_override?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: roomsUpdateOneRequiredWithoutRoom_availabilityNestedInput
  }

  export type room_availabilityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    is_available?: BoolFieldUpdateOperationsInput | boolean
    price_override?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type room_availabilityCreateManyInput = {
    id?: string
    room_id: string
    date: Date | string
    is_available: boolean
    price_override?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type room_availabilityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    is_available?: BoolFieldUpdateOperationsInput | boolean
    price_override?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type room_availabilityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    is_available?: BoolFieldUpdateOperationsInput | boolean
    price_override?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type peak_season_ratesCreateInput = {
    id?: string
    start_date: Date | string
    end_date: Date | string
    price_change_type: $Enums.PriceChangeType
    price_change_value: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
    property: propertiesCreateNestedOneWithoutPeak_season_ratesInput
    room: roomsCreateNestedOneWithoutPeak_season_ratesInput
  }

  export type peak_season_ratesUncheckedCreateInput = {
    id?: string
    property_id: string
    room_id: string
    start_date: Date | string
    end_date: Date | string
    price_change_type: $Enums.PriceChangeType
    price_change_value: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type peak_season_ratesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    price_change_type?: EnumPriceChangeTypeFieldUpdateOperationsInput | $Enums.PriceChangeType
    price_change_value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: propertiesUpdateOneRequiredWithoutPeak_season_ratesNestedInput
    room?: roomsUpdateOneRequiredWithoutPeak_season_ratesNestedInput
  }

  export type peak_season_ratesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    property_id?: StringFieldUpdateOperationsInput | string
    room_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    price_change_type?: EnumPriceChangeTypeFieldUpdateOperationsInput | $Enums.PriceChangeType
    price_change_value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type peak_season_ratesCreateManyInput = {
    id?: string
    property_id: string
    room_id: string
    start_date: Date | string
    end_date: Date | string
    price_change_type: $Enums.PriceChangeType
    price_change_value: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type peak_season_ratesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    price_change_type?: EnumPriceChangeTypeFieldUpdateOperationsInput | $Enums.PriceChangeType
    price_change_value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type peak_season_ratesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    property_id?: StringFieldUpdateOperationsInput | string
    room_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    price_change_type?: EnumPriceChangeTypeFieldUpdateOperationsInput | $Enums.PriceChangeType
    price_change_value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type bookingsCreateInput = {
    id?: string
    status: $Enums.BookingStatus
    check_in_date: Date | string
    check_out_date: Date | string
    total_price: Decimal | DecimalJsLike | number | string
    payment_deadline?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    amount: Decimal | DecimalJsLike | number | string
    paid_at?: Date | string | null
    proof_image?: string | null
    booking_rooms?: booking_roomsCreateNestedManyWithoutBookingInput
    property: propertiesCreateNestedOneWithoutBookingsInput
    user: usersCreateNestedOneWithoutBookingsInput
    reviews?: reviewsCreateNestedManyWithoutBookingInput
  }

  export type bookingsUncheckedCreateInput = {
    id?: string
    user_id: string
    property_id: string
    status: $Enums.BookingStatus
    check_in_date: Date | string
    check_out_date: Date | string
    total_price: Decimal | DecimalJsLike | number | string
    payment_deadline?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    amount: Decimal | DecimalJsLike | number | string
    paid_at?: Date | string | null
    proof_image?: string | null
    booking_rooms?: booking_roomsUncheckedCreateNestedManyWithoutBookingInput
    reviews?: reviewsUncheckedCreateNestedManyWithoutBookingInput
  }

  export type bookingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    check_in_date?: DateTimeFieldUpdateOperationsInput | Date | string
    check_out_date?: DateTimeFieldUpdateOperationsInput | Date | string
    total_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    proof_image?: NullableStringFieldUpdateOperationsInput | string | null
    booking_rooms?: booking_roomsUpdateManyWithoutBookingNestedInput
    property?: propertiesUpdateOneRequiredWithoutBookingsNestedInput
    user?: usersUpdateOneRequiredWithoutBookingsNestedInput
    reviews?: reviewsUpdateManyWithoutBookingNestedInput
  }

  export type bookingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    property_id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    check_in_date?: DateTimeFieldUpdateOperationsInput | Date | string
    check_out_date?: DateTimeFieldUpdateOperationsInput | Date | string
    total_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    proof_image?: NullableStringFieldUpdateOperationsInput | string | null
    booking_rooms?: booking_roomsUncheckedUpdateManyWithoutBookingNestedInput
    reviews?: reviewsUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type bookingsCreateManyInput = {
    id?: string
    user_id: string
    property_id: string
    status: $Enums.BookingStatus
    check_in_date: Date | string
    check_out_date: Date | string
    total_price: Decimal | DecimalJsLike | number | string
    payment_deadline?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    amount: Decimal | DecimalJsLike | number | string
    paid_at?: Date | string | null
    proof_image?: string | null
  }

  export type bookingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    check_in_date?: DateTimeFieldUpdateOperationsInput | Date | string
    check_out_date?: DateTimeFieldUpdateOperationsInput | Date | string
    total_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    proof_image?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type bookingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    property_id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    check_in_date?: DateTimeFieldUpdateOperationsInput | Date | string
    check_out_date?: DateTimeFieldUpdateOperationsInput | Date | string
    total_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    proof_image?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type booking_roomsCreateInput = {
    id?: string
    guests_count: number
    price_per_night: Decimal | DecimalJsLike | number | string
    check_in_date: Date | string
    check_out_date: Date | string
    nights: number
    quantity: number
    subtotal: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
    booking: bookingsCreateNestedOneWithoutBooking_roomsInput
    room: roomsCreateNestedOneWithoutBooking_roomsInput
  }

  export type booking_roomsUncheckedCreateInput = {
    id?: string
    booking_id: string
    room_id: string
    guests_count: number
    price_per_night: Decimal | DecimalJsLike | number | string
    check_in_date: Date | string
    check_out_date: Date | string
    nights: number
    quantity: number
    subtotal: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type booking_roomsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    guests_count?: IntFieldUpdateOperationsInput | number
    price_per_night?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    check_in_date?: DateTimeFieldUpdateOperationsInput | Date | string
    check_out_date?: DateTimeFieldUpdateOperationsInput | Date | string
    nights?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: bookingsUpdateOneRequiredWithoutBooking_roomsNestedInput
    room?: roomsUpdateOneRequiredWithoutBooking_roomsNestedInput
  }

  export type booking_roomsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    booking_id?: StringFieldUpdateOperationsInput | string
    room_id?: StringFieldUpdateOperationsInput | string
    guests_count?: IntFieldUpdateOperationsInput | number
    price_per_night?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    check_in_date?: DateTimeFieldUpdateOperationsInput | Date | string
    check_out_date?: DateTimeFieldUpdateOperationsInput | Date | string
    nights?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type booking_roomsCreateManyInput = {
    id?: string
    booking_id: string
    room_id: string
    guests_count: number
    price_per_night: Decimal | DecimalJsLike | number | string
    check_in_date: Date | string
    check_out_date: Date | string
    nights: number
    quantity: number
    subtotal: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type booking_roomsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    guests_count?: IntFieldUpdateOperationsInput | number
    price_per_night?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    check_in_date?: DateTimeFieldUpdateOperationsInput | Date | string
    check_out_date?: DateTimeFieldUpdateOperationsInput | Date | string
    nights?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type booking_roomsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    booking_id?: StringFieldUpdateOperationsInput | string
    room_id?: StringFieldUpdateOperationsInput | string
    guests_count?: IntFieldUpdateOperationsInput | number
    price_per_night?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    check_in_date?: DateTimeFieldUpdateOperationsInput | Date | string
    check_out_date?: DateTimeFieldUpdateOperationsInput | Date | string
    nights?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type reviewsCreateInput = {
    id?: string
    comment?: string | null
    tenant_reply?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    booking: bookingsCreateNestedOneWithoutReviewsInput
    property: propertiesCreateNestedOneWithoutReviewsInput
    user: usersCreateNestedOneWithoutReviewsInput
  }

  export type reviewsUncheckedCreateInput = {
    id?: string
    booking_id: string
    user_id: string
    property_id: string
    comment?: string | null
    tenant_reply?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type reviewsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    tenant_reply?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: bookingsUpdateOneRequiredWithoutReviewsNestedInput
    property?: propertiesUpdateOneRequiredWithoutReviewsNestedInput
    user?: usersUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type reviewsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    booking_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    property_id?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    tenant_reply?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type reviewsCreateManyInput = {
    id?: string
    booking_id: string
    user_id: string
    property_id: string
    comment?: string | null
    tenant_reply?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type reviewsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    tenant_reply?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type reviewsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    booking_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    property_id?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    tenant_reply?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BookingsListRelationFilter = {
    every?: bookingsWhereInput
    some?: bookingsWhereInput
    none?: bookingsWhereInput
  }

  export type ReviewsListRelationFilter = {
    every?: reviewsWhereInput
    some?: reviewsWhereInput
    none?: reviewsWhereInput
  }

  export type TenantsListRelationFilter = {
    every?: tenantsWhereInput
    some?: tenantsWhereInput
    none?: tenantsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type bookingsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type reviewsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type tenantsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    full_name?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    profile_picture?: SortOrder
    is_verified?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    reset_password_otp?: SortOrder
    verify_otp?: SortOrder
    verify_otp_expires_at?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    full_name?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    profile_picture?: SortOrder
    is_verified?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    reset_password_otp?: SortOrder
    verify_otp?: SortOrder
    verify_otp_expires_at?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    full_name?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    profile_picture?: SortOrder
    is_verified?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    reset_password_otp?: SortOrder
    verify_otp?: SortOrder
    verify_otp_expires_at?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type PropertiesListRelationFilter = {
    every?: propertiesWhereInput
    some?: propertiesWhereInput
    none?: propertiesWhereInput
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type propertiesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type tenantsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    company_name?: SortOrder
    address?: SortOrder
    phone_number?: SortOrder
    logo?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type tenantsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    company_name?: SortOrder
    address?: SortOrder
    phone_number?: SortOrder
    logo?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type tenantsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    company_name?: SortOrder
    address?: SortOrder
    phone_number?: SortOrder
    logo?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type EnumPropertyCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.PropertyCategory | EnumPropertyCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PropertyCategory[] | ListEnumPropertyCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.PropertyCategory[] | ListEnumPropertyCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumPropertyCategoryFilter<$PrismaModel> | $Enums.PropertyCategory
  }

  export type Peak_season_ratesListRelationFilter = {
    every?: peak_season_ratesWhereInput
    some?: peak_season_ratesWhereInput
    none?: peak_season_ratesWhereInput
  }

  export type TenantsScalarRelationFilter = {
    is?: tenantsWhereInput
    isNot?: tenantsWhereInput
  }

  export type Property_imagesListRelationFilter = {
    every?: property_imagesWhereInput
    some?: property_imagesWhereInput
    none?: property_imagesWhereInput
  }

  export type RoomsListRelationFilter = {
    every?: roomsWhereInput
    some?: roomsWhereInput
    none?: roomsWhereInput
  }

  export type peak_season_ratesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type property_imagesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type roomsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type propertiesCountOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    address?: SortOrder
    city?: SortOrder
    province?: SortOrder
    zip_code?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    main_image?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    property_category?: SortOrder
  }

  export type propertiesAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type propertiesMaxOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    address?: SortOrder
    city?: SortOrder
    province?: SortOrder
    zip_code?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    main_image?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    property_category?: SortOrder
  }

  export type propertiesMinOrderByAggregateInput = {
    id?: SortOrder
    tenant_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    address?: SortOrder
    city?: SortOrder
    province?: SortOrder
    zip_code?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    main_image?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    property_category?: SortOrder
  }

  export type propertiesSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumPropertyCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PropertyCategory | EnumPropertyCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PropertyCategory[] | ListEnumPropertyCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.PropertyCategory[] | ListEnumPropertyCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumPropertyCategoryWithAggregatesFilter<$PrismaModel> | $Enums.PropertyCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPropertyCategoryFilter<$PrismaModel>
    _max?: NestedEnumPropertyCategoryFilter<$PrismaModel>
  }

  export type PropertiesScalarRelationFilter = {
    is?: propertiesWhereInput
    isNot?: propertiesWhereInput
  }

  export type property_imagesCountOrderByAggregateInput = {
    id?: SortOrder
    property_id?: SortOrder
    image_url?: SortOrder
    created_at?: SortOrder
  }

  export type property_imagesMaxOrderByAggregateInput = {
    id?: SortOrder
    property_id?: SortOrder
    image_url?: SortOrder
    created_at?: SortOrder
  }

  export type property_imagesMinOrderByAggregateInput = {
    id?: SortOrder
    property_id?: SortOrder
    image_url?: SortOrder
    created_at?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type Booking_roomsListRelationFilter = {
    every?: booking_roomsWhereInput
    some?: booking_roomsWhereInput
    none?: booking_roomsWhereInput
  }

  export type Room_availabilityListRelationFilter = {
    every?: room_availabilityWhereInput
    some?: room_availabilityWhereInput
    none?: room_availabilityWhereInput
  }

  export type Room_imagesListRelationFilter = {
    every?: room_imagesWhereInput
    some?: room_imagesWhereInput
    none?: room_imagesWhereInput
  }

  export type booking_roomsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type room_availabilityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type room_imagesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type roomsCountOrderByAggregateInput = {
    id?: SortOrder
    property_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    base_price?: SortOrder
    capacity?: SortOrder
    image?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    total_rooms?: SortOrder
  }

  export type roomsAvgOrderByAggregateInput = {
    base_price?: SortOrder
    capacity?: SortOrder
    total_rooms?: SortOrder
  }

  export type roomsMaxOrderByAggregateInput = {
    id?: SortOrder
    property_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    base_price?: SortOrder
    capacity?: SortOrder
    image?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    total_rooms?: SortOrder
  }

  export type roomsMinOrderByAggregateInput = {
    id?: SortOrder
    property_id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    base_price?: SortOrder
    capacity?: SortOrder
    image?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    total_rooms?: SortOrder
  }

  export type roomsSumOrderByAggregateInput = {
    base_price?: SortOrder
    capacity?: SortOrder
    total_rooms?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type RoomsScalarRelationFilter = {
    is?: roomsWhereInput
    isNot?: roomsWhereInput
  }

  export type room_imagesCountOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    image_url?: SortOrder
    created_at?: SortOrder
  }

  export type room_imagesMaxOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    image_url?: SortOrder
    created_at?: SortOrder
  }

  export type room_imagesMinOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    image_url?: SortOrder
    created_at?: SortOrder
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type room_availabilityRoom_idDateCompoundUniqueInput = {
    room_id: string
    date: Date | string
  }

  export type room_availabilityCountOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    date?: SortOrder
    is_available?: SortOrder
    price_override?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type room_availabilityAvgOrderByAggregateInput = {
    price_override?: SortOrder
  }

  export type room_availabilityMaxOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    date?: SortOrder
    is_available?: SortOrder
    price_override?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type room_availabilityMinOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    date?: SortOrder
    is_available?: SortOrder
    price_override?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type room_availabilitySumOrderByAggregateInput = {
    price_override?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type EnumPriceChangeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PriceChangeType | EnumPriceChangeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PriceChangeType[] | ListEnumPriceChangeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PriceChangeType[] | ListEnumPriceChangeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPriceChangeTypeFilter<$PrismaModel> | $Enums.PriceChangeType
  }

  export type peak_season_ratesCountOrderByAggregateInput = {
    id?: SortOrder
    property_id?: SortOrder
    room_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    price_change_type?: SortOrder
    price_change_value?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type peak_season_ratesAvgOrderByAggregateInput = {
    price_change_value?: SortOrder
  }

  export type peak_season_ratesMaxOrderByAggregateInput = {
    id?: SortOrder
    property_id?: SortOrder
    room_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    price_change_type?: SortOrder
    price_change_value?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type peak_season_ratesMinOrderByAggregateInput = {
    id?: SortOrder
    property_id?: SortOrder
    room_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    price_change_type?: SortOrder
    price_change_value?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type peak_season_ratesSumOrderByAggregateInput = {
    price_change_value?: SortOrder
  }

  export type EnumPriceChangeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PriceChangeType | EnumPriceChangeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PriceChangeType[] | ListEnumPriceChangeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PriceChangeType[] | ListEnumPriceChangeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPriceChangeTypeWithAggregatesFilter<$PrismaModel> | $Enums.PriceChangeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPriceChangeTypeFilter<$PrismaModel>
    _max?: NestedEnumPriceChangeTypeFilter<$PrismaModel>
  }

  export type EnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
  }

  export type bookingsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    property_id?: SortOrder
    status?: SortOrder
    check_in_date?: SortOrder
    check_out_date?: SortOrder
    total_price?: SortOrder
    payment_deadline?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    amount?: SortOrder
    paid_at?: SortOrder
    proof_image?: SortOrder
  }

  export type bookingsAvgOrderByAggregateInput = {
    total_price?: SortOrder
    amount?: SortOrder
  }

  export type bookingsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    property_id?: SortOrder
    status?: SortOrder
    check_in_date?: SortOrder
    check_out_date?: SortOrder
    total_price?: SortOrder
    payment_deadline?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    amount?: SortOrder
    paid_at?: SortOrder
    proof_image?: SortOrder
  }

  export type bookingsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    property_id?: SortOrder
    status?: SortOrder
    check_in_date?: SortOrder
    check_out_date?: SortOrder
    total_price?: SortOrder
    payment_deadline?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    amount?: SortOrder
    paid_at?: SortOrder
    proof_image?: SortOrder
  }

  export type bookingsSumOrderByAggregateInput = {
    total_price?: SortOrder
    amount?: SortOrder
  }

  export type EnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookingStatusFilter<$PrismaModel>
  }

  export type BookingsScalarRelationFilter = {
    is?: bookingsWhereInput
    isNot?: bookingsWhereInput
  }

  export type booking_roomsCountOrderByAggregateInput = {
    id?: SortOrder
    booking_id?: SortOrder
    room_id?: SortOrder
    guests_count?: SortOrder
    price_per_night?: SortOrder
    check_in_date?: SortOrder
    check_out_date?: SortOrder
    nights?: SortOrder
    quantity?: SortOrder
    subtotal?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type booking_roomsAvgOrderByAggregateInput = {
    guests_count?: SortOrder
    price_per_night?: SortOrder
    nights?: SortOrder
    quantity?: SortOrder
    subtotal?: SortOrder
  }

  export type booking_roomsMaxOrderByAggregateInput = {
    id?: SortOrder
    booking_id?: SortOrder
    room_id?: SortOrder
    guests_count?: SortOrder
    price_per_night?: SortOrder
    check_in_date?: SortOrder
    check_out_date?: SortOrder
    nights?: SortOrder
    quantity?: SortOrder
    subtotal?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type booking_roomsMinOrderByAggregateInput = {
    id?: SortOrder
    booking_id?: SortOrder
    room_id?: SortOrder
    guests_count?: SortOrder
    price_per_night?: SortOrder
    check_in_date?: SortOrder
    check_out_date?: SortOrder
    nights?: SortOrder
    quantity?: SortOrder
    subtotal?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type booking_roomsSumOrderByAggregateInput = {
    guests_count?: SortOrder
    price_per_night?: SortOrder
    nights?: SortOrder
    quantity?: SortOrder
    subtotal?: SortOrder
  }

  export type reviewsCountOrderByAggregateInput = {
    id?: SortOrder
    booking_id?: SortOrder
    user_id?: SortOrder
    property_id?: SortOrder
    comment?: SortOrder
    tenant_reply?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type reviewsMaxOrderByAggregateInput = {
    id?: SortOrder
    booking_id?: SortOrder
    user_id?: SortOrder
    property_id?: SortOrder
    comment?: SortOrder
    tenant_reply?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type reviewsMinOrderByAggregateInput = {
    id?: SortOrder
    booking_id?: SortOrder
    user_id?: SortOrder
    property_id?: SortOrder
    comment?: SortOrder
    tenant_reply?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type bookingsCreateNestedManyWithoutUserInput = {
    create?: XOR<bookingsCreateWithoutUserInput, bookingsUncheckedCreateWithoutUserInput> | bookingsCreateWithoutUserInput[] | bookingsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: bookingsCreateOrConnectWithoutUserInput | bookingsCreateOrConnectWithoutUserInput[]
    createMany?: bookingsCreateManyUserInputEnvelope
    connect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
  }

  export type reviewsCreateNestedManyWithoutUserInput = {
    create?: XOR<reviewsCreateWithoutUserInput, reviewsUncheckedCreateWithoutUserInput> | reviewsCreateWithoutUserInput[] | reviewsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutUserInput | reviewsCreateOrConnectWithoutUserInput[]
    createMany?: reviewsCreateManyUserInputEnvelope
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
  }

  export type tenantsCreateNestedManyWithoutUserInput = {
    create?: XOR<tenantsCreateWithoutUserInput, tenantsUncheckedCreateWithoutUserInput> | tenantsCreateWithoutUserInput[] | tenantsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: tenantsCreateOrConnectWithoutUserInput | tenantsCreateOrConnectWithoutUserInput[]
    createMany?: tenantsCreateManyUserInputEnvelope
    connect?: tenantsWhereUniqueInput | tenantsWhereUniqueInput[]
  }

  export type bookingsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<bookingsCreateWithoutUserInput, bookingsUncheckedCreateWithoutUserInput> | bookingsCreateWithoutUserInput[] | bookingsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: bookingsCreateOrConnectWithoutUserInput | bookingsCreateOrConnectWithoutUserInput[]
    createMany?: bookingsCreateManyUserInputEnvelope
    connect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
  }

  export type reviewsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<reviewsCreateWithoutUserInput, reviewsUncheckedCreateWithoutUserInput> | reviewsCreateWithoutUserInput[] | reviewsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutUserInput | reviewsCreateOrConnectWithoutUserInput[]
    createMany?: reviewsCreateManyUserInputEnvelope
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
  }

  export type tenantsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<tenantsCreateWithoutUserInput, tenantsUncheckedCreateWithoutUserInput> | tenantsCreateWithoutUserInput[] | tenantsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: tenantsCreateOrConnectWithoutUserInput | tenantsCreateOrConnectWithoutUserInput[]
    createMany?: tenantsCreateManyUserInputEnvelope
    connect?: tenantsWhereUniqueInput | tenantsWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type bookingsUpdateManyWithoutUserNestedInput = {
    create?: XOR<bookingsCreateWithoutUserInput, bookingsUncheckedCreateWithoutUserInput> | bookingsCreateWithoutUserInput[] | bookingsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: bookingsCreateOrConnectWithoutUserInput | bookingsCreateOrConnectWithoutUserInput[]
    upsert?: bookingsUpsertWithWhereUniqueWithoutUserInput | bookingsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: bookingsCreateManyUserInputEnvelope
    set?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    disconnect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    delete?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    connect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    update?: bookingsUpdateWithWhereUniqueWithoutUserInput | bookingsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: bookingsUpdateManyWithWhereWithoutUserInput | bookingsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: bookingsScalarWhereInput | bookingsScalarWhereInput[]
  }

  export type reviewsUpdateManyWithoutUserNestedInput = {
    create?: XOR<reviewsCreateWithoutUserInput, reviewsUncheckedCreateWithoutUserInput> | reviewsCreateWithoutUserInput[] | reviewsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutUserInput | reviewsCreateOrConnectWithoutUserInput[]
    upsert?: reviewsUpsertWithWhereUniqueWithoutUserInput | reviewsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: reviewsCreateManyUserInputEnvelope
    set?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    disconnect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    delete?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    update?: reviewsUpdateWithWhereUniqueWithoutUserInput | reviewsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: reviewsUpdateManyWithWhereWithoutUserInput | reviewsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: reviewsScalarWhereInput | reviewsScalarWhereInput[]
  }

  export type tenantsUpdateManyWithoutUserNestedInput = {
    create?: XOR<tenantsCreateWithoutUserInput, tenantsUncheckedCreateWithoutUserInput> | tenantsCreateWithoutUserInput[] | tenantsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: tenantsCreateOrConnectWithoutUserInput | tenantsCreateOrConnectWithoutUserInput[]
    upsert?: tenantsUpsertWithWhereUniqueWithoutUserInput | tenantsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: tenantsCreateManyUserInputEnvelope
    set?: tenantsWhereUniqueInput | tenantsWhereUniqueInput[]
    disconnect?: tenantsWhereUniqueInput | tenantsWhereUniqueInput[]
    delete?: tenantsWhereUniqueInput | tenantsWhereUniqueInput[]
    connect?: tenantsWhereUniqueInput | tenantsWhereUniqueInput[]
    update?: tenantsUpdateWithWhereUniqueWithoutUserInput | tenantsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: tenantsUpdateManyWithWhereWithoutUserInput | tenantsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: tenantsScalarWhereInput | tenantsScalarWhereInput[]
  }

  export type bookingsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<bookingsCreateWithoutUserInput, bookingsUncheckedCreateWithoutUserInput> | bookingsCreateWithoutUserInput[] | bookingsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: bookingsCreateOrConnectWithoutUserInput | bookingsCreateOrConnectWithoutUserInput[]
    upsert?: bookingsUpsertWithWhereUniqueWithoutUserInput | bookingsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: bookingsCreateManyUserInputEnvelope
    set?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    disconnect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    delete?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    connect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    update?: bookingsUpdateWithWhereUniqueWithoutUserInput | bookingsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: bookingsUpdateManyWithWhereWithoutUserInput | bookingsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: bookingsScalarWhereInput | bookingsScalarWhereInput[]
  }

  export type reviewsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<reviewsCreateWithoutUserInput, reviewsUncheckedCreateWithoutUserInput> | reviewsCreateWithoutUserInput[] | reviewsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutUserInput | reviewsCreateOrConnectWithoutUserInput[]
    upsert?: reviewsUpsertWithWhereUniqueWithoutUserInput | reviewsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: reviewsCreateManyUserInputEnvelope
    set?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    disconnect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    delete?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    update?: reviewsUpdateWithWhereUniqueWithoutUserInput | reviewsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: reviewsUpdateManyWithWhereWithoutUserInput | reviewsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: reviewsScalarWhereInput | reviewsScalarWhereInput[]
  }

  export type tenantsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<tenantsCreateWithoutUserInput, tenantsUncheckedCreateWithoutUserInput> | tenantsCreateWithoutUserInput[] | tenantsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: tenantsCreateOrConnectWithoutUserInput | tenantsCreateOrConnectWithoutUserInput[]
    upsert?: tenantsUpsertWithWhereUniqueWithoutUserInput | tenantsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: tenantsCreateManyUserInputEnvelope
    set?: tenantsWhereUniqueInput | tenantsWhereUniqueInput[]
    disconnect?: tenantsWhereUniqueInput | tenantsWhereUniqueInput[]
    delete?: tenantsWhereUniqueInput | tenantsWhereUniqueInput[]
    connect?: tenantsWhereUniqueInput | tenantsWhereUniqueInput[]
    update?: tenantsUpdateWithWhereUniqueWithoutUserInput | tenantsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: tenantsUpdateManyWithWhereWithoutUserInput | tenantsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: tenantsScalarWhereInput | tenantsScalarWhereInput[]
  }

  export type propertiesCreateNestedManyWithoutTenantInput = {
    create?: XOR<propertiesCreateWithoutTenantInput, propertiesUncheckedCreateWithoutTenantInput> | propertiesCreateWithoutTenantInput[] | propertiesUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: propertiesCreateOrConnectWithoutTenantInput | propertiesCreateOrConnectWithoutTenantInput[]
    createMany?: propertiesCreateManyTenantInputEnvelope
    connect?: propertiesWhereUniqueInput | propertiesWhereUniqueInput[]
  }

  export type usersCreateNestedOneWithoutTenantsInput = {
    create?: XOR<usersCreateWithoutTenantsInput, usersUncheckedCreateWithoutTenantsInput>
    connectOrCreate?: usersCreateOrConnectWithoutTenantsInput
    connect?: usersWhereUniqueInput
  }

  export type propertiesUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<propertiesCreateWithoutTenantInput, propertiesUncheckedCreateWithoutTenantInput> | propertiesCreateWithoutTenantInput[] | propertiesUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: propertiesCreateOrConnectWithoutTenantInput | propertiesCreateOrConnectWithoutTenantInput[]
    createMany?: propertiesCreateManyTenantInputEnvelope
    connect?: propertiesWhereUniqueInput | propertiesWhereUniqueInput[]
  }

  export type propertiesUpdateManyWithoutTenantNestedInput = {
    create?: XOR<propertiesCreateWithoutTenantInput, propertiesUncheckedCreateWithoutTenantInput> | propertiesCreateWithoutTenantInput[] | propertiesUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: propertiesCreateOrConnectWithoutTenantInput | propertiesCreateOrConnectWithoutTenantInput[]
    upsert?: propertiesUpsertWithWhereUniqueWithoutTenantInput | propertiesUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: propertiesCreateManyTenantInputEnvelope
    set?: propertiesWhereUniqueInput | propertiesWhereUniqueInput[]
    disconnect?: propertiesWhereUniqueInput | propertiesWhereUniqueInput[]
    delete?: propertiesWhereUniqueInput | propertiesWhereUniqueInput[]
    connect?: propertiesWhereUniqueInput | propertiesWhereUniqueInput[]
    update?: propertiesUpdateWithWhereUniqueWithoutTenantInput | propertiesUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: propertiesUpdateManyWithWhereWithoutTenantInput | propertiesUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: propertiesScalarWhereInput | propertiesScalarWhereInput[]
  }

  export type usersUpdateOneRequiredWithoutTenantsNestedInput = {
    create?: XOR<usersCreateWithoutTenantsInput, usersUncheckedCreateWithoutTenantsInput>
    connectOrCreate?: usersCreateOrConnectWithoutTenantsInput
    upsert?: usersUpsertWithoutTenantsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutTenantsInput, usersUpdateWithoutTenantsInput>, usersUncheckedUpdateWithoutTenantsInput>
  }

  export type propertiesUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<propertiesCreateWithoutTenantInput, propertiesUncheckedCreateWithoutTenantInput> | propertiesCreateWithoutTenantInput[] | propertiesUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: propertiesCreateOrConnectWithoutTenantInput | propertiesCreateOrConnectWithoutTenantInput[]
    upsert?: propertiesUpsertWithWhereUniqueWithoutTenantInput | propertiesUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: propertiesCreateManyTenantInputEnvelope
    set?: propertiesWhereUniqueInput | propertiesWhereUniqueInput[]
    disconnect?: propertiesWhereUniqueInput | propertiesWhereUniqueInput[]
    delete?: propertiesWhereUniqueInput | propertiesWhereUniqueInput[]
    connect?: propertiesWhereUniqueInput | propertiesWhereUniqueInput[]
    update?: propertiesUpdateWithWhereUniqueWithoutTenantInput | propertiesUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: propertiesUpdateManyWithWhereWithoutTenantInput | propertiesUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: propertiesScalarWhereInput | propertiesScalarWhereInput[]
  }

  export type bookingsCreateNestedManyWithoutPropertyInput = {
    create?: XOR<bookingsCreateWithoutPropertyInput, bookingsUncheckedCreateWithoutPropertyInput> | bookingsCreateWithoutPropertyInput[] | bookingsUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: bookingsCreateOrConnectWithoutPropertyInput | bookingsCreateOrConnectWithoutPropertyInput[]
    createMany?: bookingsCreateManyPropertyInputEnvelope
    connect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
  }

  export type peak_season_ratesCreateNestedManyWithoutPropertyInput = {
    create?: XOR<peak_season_ratesCreateWithoutPropertyInput, peak_season_ratesUncheckedCreateWithoutPropertyInput> | peak_season_ratesCreateWithoutPropertyInput[] | peak_season_ratesUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: peak_season_ratesCreateOrConnectWithoutPropertyInput | peak_season_ratesCreateOrConnectWithoutPropertyInput[]
    createMany?: peak_season_ratesCreateManyPropertyInputEnvelope
    connect?: peak_season_ratesWhereUniqueInput | peak_season_ratesWhereUniqueInput[]
  }

  export type tenantsCreateNestedOneWithoutPropertiesInput = {
    create?: XOR<tenantsCreateWithoutPropertiesInput, tenantsUncheckedCreateWithoutPropertiesInput>
    connectOrCreate?: tenantsCreateOrConnectWithoutPropertiesInput
    connect?: tenantsWhereUniqueInput
  }

  export type property_imagesCreateNestedManyWithoutPropertyInput = {
    create?: XOR<property_imagesCreateWithoutPropertyInput, property_imagesUncheckedCreateWithoutPropertyInput> | property_imagesCreateWithoutPropertyInput[] | property_imagesUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: property_imagesCreateOrConnectWithoutPropertyInput | property_imagesCreateOrConnectWithoutPropertyInput[]
    createMany?: property_imagesCreateManyPropertyInputEnvelope
    connect?: property_imagesWhereUniqueInput | property_imagesWhereUniqueInput[]
  }

  export type reviewsCreateNestedManyWithoutPropertyInput = {
    create?: XOR<reviewsCreateWithoutPropertyInput, reviewsUncheckedCreateWithoutPropertyInput> | reviewsCreateWithoutPropertyInput[] | reviewsUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutPropertyInput | reviewsCreateOrConnectWithoutPropertyInput[]
    createMany?: reviewsCreateManyPropertyInputEnvelope
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
  }

  export type roomsCreateNestedManyWithoutPropertyInput = {
    create?: XOR<roomsCreateWithoutPropertyInput, roomsUncheckedCreateWithoutPropertyInput> | roomsCreateWithoutPropertyInput[] | roomsUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: roomsCreateOrConnectWithoutPropertyInput | roomsCreateOrConnectWithoutPropertyInput[]
    createMany?: roomsCreateManyPropertyInputEnvelope
    connect?: roomsWhereUniqueInput | roomsWhereUniqueInput[]
  }

  export type bookingsUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<bookingsCreateWithoutPropertyInput, bookingsUncheckedCreateWithoutPropertyInput> | bookingsCreateWithoutPropertyInput[] | bookingsUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: bookingsCreateOrConnectWithoutPropertyInput | bookingsCreateOrConnectWithoutPropertyInput[]
    createMany?: bookingsCreateManyPropertyInputEnvelope
    connect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
  }

  export type peak_season_ratesUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<peak_season_ratesCreateWithoutPropertyInput, peak_season_ratesUncheckedCreateWithoutPropertyInput> | peak_season_ratesCreateWithoutPropertyInput[] | peak_season_ratesUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: peak_season_ratesCreateOrConnectWithoutPropertyInput | peak_season_ratesCreateOrConnectWithoutPropertyInput[]
    createMany?: peak_season_ratesCreateManyPropertyInputEnvelope
    connect?: peak_season_ratesWhereUniqueInput | peak_season_ratesWhereUniqueInput[]
  }

  export type property_imagesUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<property_imagesCreateWithoutPropertyInput, property_imagesUncheckedCreateWithoutPropertyInput> | property_imagesCreateWithoutPropertyInput[] | property_imagesUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: property_imagesCreateOrConnectWithoutPropertyInput | property_imagesCreateOrConnectWithoutPropertyInput[]
    createMany?: property_imagesCreateManyPropertyInputEnvelope
    connect?: property_imagesWhereUniqueInput | property_imagesWhereUniqueInput[]
  }

  export type reviewsUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<reviewsCreateWithoutPropertyInput, reviewsUncheckedCreateWithoutPropertyInput> | reviewsCreateWithoutPropertyInput[] | reviewsUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutPropertyInput | reviewsCreateOrConnectWithoutPropertyInput[]
    createMany?: reviewsCreateManyPropertyInputEnvelope
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
  }

  export type roomsUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<roomsCreateWithoutPropertyInput, roomsUncheckedCreateWithoutPropertyInput> | roomsCreateWithoutPropertyInput[] | roomsUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: roomsCreateOrConnectWithoutPropertyInput | roomsCreateOrConnectWithoutPropertyInput[]
    createMany?: roomsCreateManyPropertyInputEnvelope
    connect?: roomsWhereUniqueInput | roomsWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumPropertyCategoryFieldUpdateOperationsInput = {
    set?: $Enums.PropertyCategory
  }

  export type bookingsUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<bookingsCreateWithoutPropertyInput, bookingsUncheckedCreateWithoutPropertyInput> | bookingsCreateWithoutPropertyInput[] | bookingsUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: bookingsCreateOrConnectWithoutPropertyInput | bookingsCreateOrConnectWithoutPropertyInput[]
    upsert?: bookingsUpsertWithWhereUniqueWithoutPropertyInput | bookingsUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: bookingsCreateManyPropertyInputEnvelope
    set?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    disconnect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    delete?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    connect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    update?: bookingsUpdateWithWhereUniqueWithoutPropertyInput | bookingsUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: bookingsUpdateManyWithWhereWithoutPropertyInput | bookingsUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: bookingsScalarWhereInput | bookingsScalarWhereInput[]
  }

  export type peak_season_ratesUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<peak_season_ratesCreateWithoutPropertyInput, peak_season_ratesUncheckedCreateWithoutPropertyInput> | peak_season_ratesCreateWithoutPropertyInput[] | peak_season_ratesUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: peak_season_ratesCreateOrConnectWithoutPropertyInput | peak_season_ratesCreateOrConnectWithoutPropertyInput[]
    upsert?: peak_season_ratesUpsertWithWhereUniqueWithoutPropertyInput | peak_season_ratesUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: peak_season_ratesCreateManyPropertyInputEnvelope
    set?: peak_season_ratesWhereUniqueInput | peak_season_ratesWhereUniqueInput[]
    disconnect?: peak_season_ratesWhereUniqueInput | peak_season_ratesWhereUniqueInput[]
    delete?: peak_season_ratesWhereUniqueInput | peak_season_ratesWhereUniqueInput[]
    connect?: peak_season_ratesWhereUniqueInput | peak_season_ratesWhereUniqueInput[]
    update?: peak_season_ratesUpdateWithWhereUniqueWithoutPropertyInput | peak_season_ratesUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: peak_season_ratesUpdateManyWithWhereWithoutPropertyInput | peak_season_ratesUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: peak_season_ratesScalarWhereInput | peak_season_ratesScalarWhereInput[]
  }

  export type tenantsUpdateOneRequiredWithoutPropertiesNestedInput = {
    create?: XOR<tenantsCreateWithoutPropertiesInput, tenantsUncheckedCreateWithoutPropertiesInput>
    connectOrCreate?: tenantsCreateOrConnectWithoutPropertiesInput
    upsert?: tenantsUpsertWithoutPropertiesInput
    connect?: tenantsWhereUniqueInput
    update?: XOR<XOR<tenantsUpdateToOneWithWhereWithoutPropertiesInput, tenantsUpdateWithoutPropertiesInput>, tenantsUncheckedUpdateWithoutPropertiesInput>
  }

  export type property_imagesUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<property_imagesCreateWithoutPropertyInput, property_imagesUncheckedCreateWithoutPropertyInput> | property_imagesCreateWithoutPropertyInput[] | property_imagesUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: property_imagesCreateOrConnectWithoutPropertyInput | property_imagesCreateOrConnectWithoutPropertyInput[]
    upsert?: property_imagesUpsertWithWhereUniqueWithoutPropertyInput | property_imagesUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: property_imagesCreateManyPropertyInputEnvelope
    set?: property_imagesWhereUniqueInput | property_imagesWhereUniqueInput[]
    disconnect?: property_imagesWhereUniqueInput | property_imagesWhereUniqueInput[]
    delete?: property_imagesWhereUniqueInput | property_imagesWhereUniqueInput[]
    connect?: property_imagesWhereUniqueInput | property_imagesWhereUniqueInput[]
    update?: property_imagesUpdateWithWhereUniqueWithoutPropertyInput | property_imagesUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: property_imagesUpdateManyWithWhereWithoutPropertyInput | property_imagesUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: property_imagesScalarWhereInput | property_imagesScalarWhereInput[]
  }

  export type reviewsUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<reviewsCreateWithoutPropertyInput, reviewsUncheckedCreateWithoutPropertyInput> | reviewsCreateWithoutPropertyInput[] | reviewsUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutPropertyInput | reviewsCreateOrConnectWithoutPropertyInput[]
    upsert?: reviewsUpsertWithWhereUniqueWithoutPropertyInput | reviewsUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: reviewsCreateManyPropertyInputEnvelope
    set?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    disconnect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    delete?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    update?: reviewsUpdateWithWhereUniqueWithoutPropertyInput | reviewsUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: reviewsUpdateManyWithWhereWithoutPropertyInput | reviewsUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: reviewsScalarWhereInput | reviewsScalarWhereInput[]
  }

  export type roomsUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<roomsCreateWithoutPropertyInput, roomsUncheckedCreateWithoutPropertyInput> | roomsCreateWithoutPropertyInput[] | roomsUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: roomsCreateOrConnectWithoutPropertyInput | roomsCreateOrConnectWithoutPropertyInput[]
    upsert?: roomsUpsertWithWhereUniqueWithoutPropertyInput | roomsUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: roomsCreateManyPropertyInputEnvelope
    set?: roomsWhereUniqueInput | roomsWhereUniqueInput[]
    disconnect?: roomsWhereUniqueInput | roomsWhereUniqueInput[]
    delete?: roomsWhereUniqueInput | roomsWhereUniqueInput[]
    connect?: roomsWhereUniqueInput | roomsWhereUniqueInput[]
    update?: roomsUpdateWithWhereUniqueWithoutPropertyInput | roomsUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: roomsUpdateManyWithWhereWithoutPropertyInput | roomsUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: roomsScalarWhereInput | roomsScalarWhereInput[]
  }

  export type bookingsUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<bookingsCreateWithoutPropertyInput, bookingsUncheckedCreateWithoutPropertyInput> | bookingsCreateWithoutPropertyInput[] | bookingsUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: bookingsCreateOrConnectWithoutPropertyInput | bookingsCreateOrConnectWithoutPropertyInput[]
    upsert?: bookingsUpsertWithWhereUniqueWithoutPropertyInput | bookingsUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: bookingsCreateManyPropertyInputEnvelope
    set?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    disconnect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    delete?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    connect?: bookingsWhereUniqueInput | bookingsWhereUniqueInput[]
    update?: bookingsUpdateWithWhereUniqueWithoutPropertyInput | bookingsUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: bookingsUpdateManyWithWhereWithoutPropertyInput | bookingsUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: bookingsScalarWhereInput | bookingsScalarWhereInput[]
  }

  export type peak_season_ratesUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<peak_season_ratesCreateWithoutPropertyInput, peak_season_ratesUncheckedCreateWithoutPropertyInput> | peak_season_ratesCreateWithoutPropertyInput[] | peak_season_ratesUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: peak_season_ratesCreateOrConnectWithoutPropertyInput | peak_season_ratesCreateOrConnectWithoutPropertyInput[]
    upsert?: peak_season_ratesUpsertWithWhereUniqueWithoutPropertyInput | peak_season_ratesUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: peak_season_ratesCreateManyPropertyInputEnvelope
    set?: peak_season_ratesWhereUniqueInput | peak_season_ratesWhereUniqueInput[]
    disconnect?: peak_season_ratesWhereUniqueInput | peak_season_ratesWhereUniqueInput[]
    delete?: peak_season_ratesWhereUniqueInput | peak_season_ratesWhereUniqueInput[]
    connect?: peak_season_ratesWhereUniqueInput | peak_season_ratesWhereUniqueInput[]
    update?: peak_season_ratesUpdateWithWhereUniqueWithoutPropertyInput | peak_season_ratesUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: peak_season_ratesUpdateManyWithWhereWithoutPropertyInput | peak_season_ratesUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: peak_season_ratesScalarWhereInput | peak_season_ratesScalarWhereInput[]
  }

  export type property_imagesUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<property_imagesCreateWithoutPropertyInput, property_imagesUncheckedCreateWithoutPropertyInput> | property_imagesCreateWithoutPropertyInput[] | property_imagesUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: property_imagesCreateOrConnectWithoutPropertyInput | property_imagesCreateOrConnectWithoutPropertyInput[]
    upsert?: property_imagesUpsertWithWhereUniqueWithoutPropertyInput | property_imagesUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: property_imagesCreateManyPropertyInputEnvelope
    set?: property_imagesWhereUniqueInput | property_imagesWhereUniqueInput[]
    disconnect?: property_imagesWhereUniqueInput | property_imagesWhereUniqueInput[]
    delete?: property_imagesWhereUniqueInput | property_imagesWhereUniqueInput[]
    connect?: property_imagesWhereUniqueInput | property_imagesWhereUniqueInput[]
    update?: property_imagesUpdateWithWhereUniqueWithoutPropertyInput | property_imagesUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: property_imagesUpdateManyWithWhereWithoutPropertyInput | property_imagesUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: property_imagesScalarWhereInput | property_imagesScalarWhereInput[]
  }

  export type reviewsUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<reviewsCreateWithoutPropertyInput, reviewsUncheckedCreateWithoutPropertyInput> | reviewsCreateWithoutPropertyInput[] | reviewsUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutPropertyInput | reviewsCreateOrConnectWithoutPropertyInput[]
    upsert?: reviewsUpsertWithWhereUniqueWithoutPropertyInput | reviewsUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: reviewsCreateManyPropertyInputEnvelope
    set?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    disconnect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    delete?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    update?: reviewsUpdateWithWhereUniqueWithoutPropertyInput | reviewsUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: reviewsUpdateManyWithWhereWithoutPropertyInput | reviewsUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: reviewsScalarWhereInput | reviewsScalarWhereInput[]
  }

  export type roomsUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<roomsCreateWithoutPropertyInput, roomsUncheckedCreateWithoutPropertyInput> | roomsCreateWithoutPropertyInput[] | roomsUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: roomsCreateOrConnectWithoutPropertyInput | roomsCreateOrConnectWithoutPropertyInput[]
    upsert?: roomsUpsertWithWhereUniqueWithoutPropertyInput | roomsUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: roomsCreateManyPropertyInputEnvelope
    set?: roomsWhereUniqueInput | roomsWhereUniqueInput[]
    disconnect?: roomsWhereUniqueInput | roomsWhereUniqueInput[]
    delete?: roomsWhereUniqueInput | roomsWhereUniqueInput[]
    connect?: roomsWhereUniqueInput | roomsWhereUniqueInput[]
    update?: roomsUpdateWithWhereUniqueWithoutPropertyInput | roomsUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: roomsUpdateManyWithWhereWithoutPropertyInput | roomsUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: roomsScalarWhereInput | roomsScalarWhereInput[]
  }

  export type propertiesCreateNestedOneWithoutProperty_imagesInput = {
    create?: XOR<propertiesCreateWithoutProperty_imagesInput, propertiesUncheckedCreateWithoutProperty_imagesInput>
    connectOrCreate?: propertiesCreateOrConnectWithoutProperty_imagesInput
    connect?: propertiesWhereUniqueInput
  }

  export type propertiesUpdateOneRequiredWithoutProperty_imagesNestedInput = {
    create?: XOR<propertiesCreateWithoutProperty_imagesInput, propertiesUncheckedCreateWithoutProperty_imagesInput>
    connectOrCreate?: propertiesCreateOrConnectWithoutProperty_imagesInput
    upsert?: propertiesUpsertWithoutProperty_imagesInput
    connect?: propertiesWhereUniqueInput
    update?: XOR<XOR<propertiesUpdateToOneWithWhereWithoutProperty_imagesInput, propertiesUpdateWithoutProperty_imagesInput>, propertiesUncheckedUpdateWithoutProperty_imagesInput>
  }

  export type booking_roomsCreateNestedManyWithoutRoomInput = {
    create?: XOR<booking_roomsCreateWithoutRoomInput, booking_roomsUncheckedCreateWithoutRoomInput> | booking_roomsCreateWithoutRoomInput[] | booking_roomsUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: booking_roomsCreateOrConnectWithoutRoomInput | booking_roomsCreateOrConnectWithoutRoomInput[]
    createMany?: booking_roomsCreateManyRoomInputEnvelope
    connect?: booking_roomsWhereUniqueInput | booking_roomsWhereUniqueInput[]
  }

  export type peak_season_ratesCreateNestedManyWithoutRoomInput = {
    create?: XOR<peak_season_ratesCreateWithoutRoomInput, peak_season_ratesUncheckedCreateWithoutRoomInput> | peak_season_ratesCreateWithoutRoomInput[] | peak_season_ratesUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: peak_season_ratesCreateOrConnectWithoutRoomInput | peak_season_ratesCreateOrConnectWithoutRoomInput[]
    createMany?: peak_season_ratesCreateManyRoomInputEnvelope
    connect?: peak_season_ratesWhereUniqueInput | peak_season_ratesWhereUniqueInput[]
  }

  export type room_availabilityCreateNestedManyWithoutRoomInput = {
    create?: XOR<room_availabilityCreateWithoutRoomInput, room_availabilityUncheckedCreateWithoutRoomInput> | room_availabilityCreateWithoutRoomInput[] | room_availabilityUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: room_availabilityCreateOrConnectWithoutRoomInput | room_availabilityCreateOrConnectWithoutRoomInput[]
    createMany?: room_availabilityCreateManyRoomInputEnvelope
    connect?: room_availabilityWhereUniqueInput | room_availabilityWhereUniqueInput[]
  }

  export type room_imagesCreateNestedManyWithoutRoomInput = {
    create?: XOR<room_imagesCreateWithoutRoomInput, room_imagesUncheckedCreateWithoutRoomInput> | room_imagesCreateWithoutRoomInput[] | room_imagesUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: room_imagesCreateOrConnectWithoutRoomInput | room_imagesCreateOrConnectWithoutRoomInput[]
    createMany?: room_imagesCreateManyRoomInputEnvelope
    connect?: room_imagesWhereUniqueInput | room_imagesWhereUniqueInput[]
  }

  export type propertiesCreateNestedOneWithoutRoomsInput = {
    create?: XOR<propertiesCreateWithoutRoomsInput, propertiesUncheckedCreateWithoutRoomsInput>
    connectOrCreate?: propertiesCreateOrConnectWithoutRoomsInput
    connect?: propertiesWhereUniqueInput
  }

  export type booking_roomsUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<booking_roomsCreateWithoutRoomInput, booking_roomsUncheckedCreateWithoutRoomInput> | booking_roomsCreateWithoutRoomInput[] | booking_roomsUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: booking_roomsCreateOrConnectWithoutRoomInput | booking_roomsCreateOrConnectWithoutRoomInput[]
    createMany?: booking_roomsCreateManyRoomInputEnvelope
    connect?: booking_roomsWhereUniqueInput | booking_roomsWhereUniqueInput[]
  }

  export type peak_season_ratesUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<peak_season_ratesCreateWithoutRoomInput, peak_season_ratesUncheckedCreateWithoutRoomInput> | peak_season_ratesCreateWithoutRoomInput[] | peak_season_ratesUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: peak_season_ratesCreateOrConnectWithoutRoomInput | peak_season_ratesCreateOrConnectWithoutRoomInput[]
    createMany?: peak_season_ratesCreateManyRoomInputEnvelope
    connect?: peak_season_ratesWhereUniqueInput | peak_season_ratesWhereUniqueInput[]
  }

  export type room_availabilityUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<room_availabilityCreateWithoutRoomInput, room_availabilityUncheckedCreateWithoutRoomInput> | room_availabilityCreateWithoutRoomInput[] | room_availabilityUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: room_availabilityCreateOrConnectWithoutRoomInput | room_availabilityCreateOrConnectWithoutRoomInput[]
    createMany?: room_availabilityCreateManyRoomInputEnvelope
    connect?: room_availabilityWhereUniqueInput | room_availabilityWhereUniqueInput[]
  }

  export type room_imagesUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<room_imagesCreateWithoutRoomInput, room_imagesUncheckedCreateWithoutRoomInput> | room_imagesCreateWithoutRoomInput[] | room_imagesUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: room_imagesCreateOrConnectWithoutRoomInput | room_imagesCreateOrConnectWithoutRoomInput[]
    createMany?: room_imagesCreateManyRoomInputEnvelope
    connect?: room_imagesWhereUniqueInput | room_imagesWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type booking_roomsUpdateManyWithoutRoomNestedInput = {
    create?: XOR<booking_roomsCreateWithoutRoomInput, booking_roomsUncheckedCreateWithoutRoomInput> | booking_roomsCreateWithoutRoomInput[] | booking_roomsUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: booking_roomsCreateOrConnectWithoutRoomInput | booking_roomsCreateOrConnectWithoutRoomInput[]
    upsert?: booking_roomsUpsertWithWhereUniqueWithoutRoomInput | booking_roomsUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: booking_roomsCreateManyRoomInputEnvelope
    set?: booking_roomsWhereUniqueInput | booking_roomsWhereUniqueInput[]
    disconnect?: booking_roomsWhereUniqueInput | booking_roomsWhereUniqueInput[]
    delete?: booking_roomsWhereUniqueInput | booking_roomsWhereUniqueInput[]
    connect?: booking_roomsWhereUniqueInput | booking_roomsWhereUniqueInput[]
    update?: booking_roomsUpdateWithWhereUniqueWithoutRoomInput | booking_roomsUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: booking_roomsUpdateManyWithWhereWithoutRoomInput | booking_roomsUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: booking_roomsScalarWhereInput | booking_roomsScalarWhereInput[]
  }

  export type peak_season_ratesUpdateManyWithoutRoomNestedInput = {
    create?: XOR<peak_season_ratesCreateWithoutRoomInput, peak_season_ratesUncheckedCreateWithoutRoomInput> | peak_season_ratesCreateWithoutRoomInput[] | peak_season_ratesUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: peak_season_ratesCreateOrConnectWithoutRoomInput | peak_season_ratesCreateOrConnectWithoutRoomInput[]
    upsert?: peak_season_ratesUpsertWithWhereUniqueWithoutRoomInput | peak_season_ratesUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: peak_season_ratesCreateManyRoomInputEnvelope
    set?: peak_season_ratesWhereUniqueInput | peak_season_ratesWhereUniqueInput[]
    disconnect?: peak_season_ratesWhereUniqueInput | peak_season_ratesWhereUniqueInput[]
    delete?: peak_season_ratesWhereUniqueInput | peak_season_ratesWhereUniqueInput[]
    connect?: peak_season_ratesWhereUniqueInput | peak_season_ratesWhereUniqueInput[]
    update?: peak_season_ratesUpdateWithWhereUniqueWithoutRoomInput | peak_season_ratesUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: peak_season_ratesUpdateManyWithWhereWithoutRoomInput | peak_season_ratesUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: peak_season_ratesScalarWhereInput | peak_season_ratesScalarWhereInput[]
  }

  export type room_availabilityUpdateManyWithoutRoomNestedInput = {
    create?: XOR<room_availabilityCreateWithoutRoomInput, room_availabilityUncheckedCreateWithoutRoomInput> | room_availabilityCreateWithoutRoomInput[] | room_availabilityUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: room_availabilityCreateOrConnectWithoutRoomInput | room_availabilityCreateOrConnectWithoutRoomInput[]
    upsert?: room_availabilityUpsertWithWhereUniqueWithoutRoomInput | room_availabilityUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: room_availabilityCreateManyRoomInputEnvelope
    set?: room_availabilityWhereUniqueInput | room_availabilityWhereUniqueInput[]
    disconnect?: room_availabilityWhereUniqueInput | room_availabilityWhereUniqueInput[]
    delete?: room_availabilityWhereUniqueInput | room_availabilityWhereUniqueInput[]
    connect?: room_availabilityWhereUniqueInput | room_availabilityWhereUniqueInput[]
    update?: room_availabilityUpdateWithWhereUniqueWithoutRoomInput | room_availabilityUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: room_availabilityUpdateManyWithWhereWithoutRoomInput | room_availabilityUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: room_availabilityScalarWhereInput | room_availabilityScalarWhereInput[]
  }

  export type room_imagesUpdateManyWithoutRoomNestedInput = {
    create?: XOR<room_imagesCreateWithoutRoomInput, room_imagesUncheckedCreateWithoutRoomInput> | room_imagesCreateWithoutRoomInput[] | room_imagesUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: room_imagesCreateOrConnectWithoutRoomInput | room_imagesCreateOrConnectWithoutRoomInput[]
    upsert?: room_imagesUpsertWithWhereUniqueWithoutRoomInput | room_imagesUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: room_imagesCreateManyRoomInputEnvelope
    set?: room_imagesWhereUniqueInput | room_imagesWhereUniqueInput[]
    disconnect?: room_imagesWhereUniqueInput | room_imagesWhereUniqueInput[]
    delete?: room_imagesWhereUniqueInput | room_imagesWhereUniqueInput[]
    connect?: room_imagesWhereUniqueInput | room_imagesWhereUniqueInput[]
    update?: room_imagesUpdateWithWhereUniqueWithoutRoomInput | room_imagesUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: room_imagesUpdateManyWithWhereWithoutRoomInput | room_imagesUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: room_imagesScalarWhereInput | room_imagesScalarWhereInput[]
  }

  export type propertiesUpdateOneRequiredWithoutRoomsNestedInput = {
    create?: XOR<propertiesCreateWithoutRoomsInput, propertiesUncheckedCreateWithoutRoomsInput>
    connectOrCreate?: propertiesCreateOrConnectWithoutRoomsInput
    upsert?: propertiesUpsertWithoutRoomsInput
    connect?: propertiesWhereUniqueInput
    update?: XOR<XOR<propertiesUpdateToOneWithWhereWithoutRoomsInput, propertiesUpdateWithoutRoomsInput>, propertiesUncheckedUpdateWithoutRoomsInput>
  }

  export type booking_roomsUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<booking_roomsCreateWithoutRoomInput, booking_roomsUncheckedCreateWithoutRoomInput> | booking_roomsCreateWithoutRoomInput[] | booking_roomsUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: booking_roomsCreateOrConnectWithoutRoomInput | booking_roomsCreateOrConnectWithoutRoomInput[]
    upsert?: booking_roomsUpsertWithWhereUniqueWithoutRoomInput | booking_roomsUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: booking_roomsCreateManyRoomInputEnvelope
    set?: booking_roomsWhereUniqueInput | booking_roomsWhereUniqueInput[]
    disconnect?: booking_roomsWhereUniqueInput | booking_roomsWhereUniqueInput[]
    delete?: booking_roomsWhereUniqueInput | booking_roomsWhereUniqueInput[]
    connect?: booking_roomsWhereUniqueInput | booking_roomsWhereUniqueInput[]
    update?: booking_roomsUpdateWithWhereUniqueWithoutRoomInput | booking_roomsUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: booking_roomsUpdateManyWithWhereWithoutRoomInput | booking_roomsUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: booking_roomsScalarWhereInput | booking_roomsScalarWhereInput[]
  }

  export type peak_season_ratesUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<peak_season_ratesCreateWithoutRoomInput, peak_season_ratesUncheckedCreateWithoutRoomInput> | peak_season_ratesCreateWithoutRoomInput[] | peak_season_ratesUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: peak_season_ratesCreateOrConnectWithoutRoomInput | peak_season_ratesCreateOrConnectWithoutRoomInput[]
    upsert?: peak_season_ratesUpsertWithWhereUniqueWithoutRoomInput | peak_season_ratesUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: peak_season_ratesCreateManyRoomInputEnvelope
    set?: peak_season_ratesWhereUniqueInput | peak_season_ratesWhereUniqueInput[]
    disconnect?: peak_season_ratesWhereUniqueInput | peak_season_ratesWhereUniqueInput[]
    delete?: peak_season_ratesWhereUniqueInput | peak_season_ratesWhereUniqueInput[]
    connect?: peak_season_ratesWhereUniqueInput | peak_season_ratesWhereUniqueInput[]
    update?: peak_season_ratesUpdateWithWhereUniqueWithoutRoomInput | peak_season_ratesUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: peak_season_ratesUpdateManyWithWhereWithoutRoomInput | peak_season_ratesUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: peak_season_ratesScalarWhereInput | peak_season_ratesScalarWhereInput[]
  }

  export type room_availabilityUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<room_availabilityCreateWithoutRoomInput, room_availabilityUncheckedCreateWithoutRoomInput> | room_availabilityCreateWithoutRoomInput[] | room_availabilityUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: room_availabilityCreateOrConnectWithoutRoomInput | room_availabilityCreateOrConnectWithoutRoomInput[]
    upsert?: room_availabilityUpsertWithWhereUniqueWithoutRoomInput | room_availabilityUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: room_availabilityCreateManyRoomInputEnvelope
    set?: room_availabilityWhereUniqueInput | room_availabilityWhereUniqueInput[]
    disconnect?: room_availabilityWhereUniqueInput | room_availabilityWhereUniqueInput[]
    delete?: room_availabilityWhereUniqueInput | room_availabilityWhereUniqueInput[]
    connect?: room_availabilityWhereUniqueInput | room_availabilityWhereUniqueInput[]
    update?: room_availabilityUpdateWithWhereUniqueWithoutRoomInput | room_availabilityUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: room_availabilityUpdateManyWithWhereWithoutRoomInput | room_availabilityUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: room_availabilityScalarWhereInput | room_availabilityScalarWhereInput[]
  }

  export type room_imagesUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<room_imagesCreateWithoutRoomInput, room_imagesUncheckedCreateWithoutRoomInput> | room_imagesCreateWithoutRoomInput[] | room_imagesUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: room_imagesCreateOrConnectWithoutRoomInput | room_imagesCreateOrConnectWithoutRoomInput[]
    upsert?: room_imagesUpsertWithWhereUniqueWithoutRoomInput | room_imagesUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: room_imagesCreateManyRoomInputEnvelope
    set?: room_imagesWhereUniqueInput | room_imagesWhereUniqueInput[]
    disconnect?: room_imagesWhereUniqueInput | room_imagesWhereUniqueInput[]
    delete?: room_imagesWhereUniqueInput | room_imagesWhereUniqueInput[]
    connect?: room_imagesWhereUniqueInput | room_imagesWhereUniqueInput[]
    update?: room_imagesUpdateWithWhereUniqueWithoutRoomInput | room_imagesUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: room_imagesUpdateManyWithWhereWithoutRoomInput | room_imagesUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: room_imagesScalarWhereInput | room_imagesScalarWhereInput[]
  }

  export type roomsCreateNestedOneWithoutRoom_imagesInput = {
    create?: XOR<roomsCreateWithoutRoom_imagesInput, roomsUncheckedCreateWithoutRoom_imagesInput>
    connectOrCreate?: roomsCreateOrConnectWithoutRoom_imagesInput
    connect?: roomsWhereUniqueInput
  }

  export type roomsUpdateOneRequiredWithoutRoom_imagesNestedInput = {
    create?: XOR<roomsCreateWithoutRoom_imagesInput, roomsUncheckedCreateWithoutRoom_imagesInput>
    connectOrCreate?: roomsCreateOrConnectWithoutRoom_imagesInput
    upsert?: roomsUpsertWithoutRoom_imagesInput
    connect?: roomsWhereUniqueInput
    update?: XOR<XOR<roomsUpdateToOneWithWhereWithoutRoom_imagesInput, roomsUpdateWithoutRoom_imagesInput>, roomsUncheckedUpdateWithoutRoom_imagesInput>
  }

  export type roomsCreateNestedOneWithoutRoom_availabilityInput = {
    create?: XOR<roomsCreateWithoutRoom_availabilityInput, roomsUncheckedCreateWithoutRoom_availabilityInput>
    connectOrCreate?: roomsCreateOrConnectWithoutRoom_availabilityInput
    connect?: roomsWhereUniqueInput
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type roomsUpdateOneRequiredWithoutRoom_availabilityNestedInput = {
    create?: XOR<roomsCreateWithoutRoom_availabilityInput, roomsUncheckedCreateWithoutRoom_availabilityInput>
    connectOrCreate?: roomsCreateOrConnectWithoutRoom_availabilityInput
    upsert?: roomsUpsertWithoutRoom_availabilityInput
    connect?: roomsWhereUniqueInput
    update?: XOR<XOR<roomsUpdateToOneWithWhereWithoutRoom_availabilityInput, roomsUpdateWithoutRoom_availabilityInput>, roomsUncheckedUpdateWithoutRoom_availabilityInput>
  }

  export type propertiesCreateNestedOneWithoutPeak_season_ratesInput = {
    create?: XOR<propertiesCreateWithoutPeak_season_ratesInput, propertiesUncheckedCreateWithoutPeak_season_ratesInput>
    connectOrCreate?: propertiesCreateOrConnectWithoutPeak_season_ratesInput
    connect?: propertiesWhereUniqueInput
  }

  export type roomsCreateNestedOneWithoutPeak_season_ratesInput = {
    create?: XOR<roomsCreateWithoutPeak_season_ratesInput, roomsUncheckedCreateWithoutPeak_season_ratesInput>
    connectOrCreate?: roomsCreateOrConnectWithoutPeak_season_ratesInput
    connect?: roomsWhereUniqueInput
  }

  export type EnumPriceChangeTypeFieldUpdateOperationsInput = {
    set?: $Enums.PriceChangeType
  }

  export type propertiesUpdateOneRequiredWithoutPeak_season_ratesNestedInput = {
    create?: XOR<propertiesCreateWithoutPeak_season_ratesInput, propertiesUncheckedCreateWithoutPeak_season_ratesInput>
    connectOrCreate?: propertiesCreateOrConnectWithoutPeak_season_ratesInput
    upsert?: propertiesUpsertWithoutPeak_season_ratesInput
    connect?: propertiesWhereUniqueInput
    update?: XOR<XOR<propertiesUpdateToOneWithWhereWithoutPeak_season_ratesInput, propertiesUpdateWithoutPeak_season_ratesInput>, propertiesUncheckedUpdateWithoutPeak_season_ratesInput>
  }

  export type roomsUpdateOneRequiredWithoutPeak_season_ratesNestedInput = {
    create?: XOR<roomsCreateWithoutPeak_season_ratesInput, roomsUncheckedCreateWithoutPeak_season_ratesInput>
    connectOrCreate?: roomsCreateOrConnectWithoutPeak_season_ratesInput
    upsert?: roomsUpsertWithoutPeak_season_ratesInput
    connect?: roomsWhereUniqueInput
    update?: XOR<XOR<roomsUpdateToOneWithWhereWithoutPeak_season_ratesInput, roomsUpdateWithoutPeak_season_ratesInput>, roomsUncheckedUpdateWithoutPeak_season_ratesInput>
  }

  export type booking_roomsCreateNestedManyWithoutBookingInput = {
    create?: XOR<booking_roomsCreateWithoutBookingInput, booking_roomsUncheckedCreateWithoutBookingInput> | booking_roomsCreateWithoutBookingInput[] | booking_roomsUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: booking_roomsCreateOrConnectWithoutBookingInput | booking_roomsCreateOrConnectWithoutBookingInput[]
    createMany?: booking_roomsCreateManyBookingInputEnvelope
    connect?: booking_roomsWhereUniqueInput | booking_roomsWhereUniqueInput[]
  }

  export type propertiesCreateNestedOneWithoutBookingsInput = {
    create?: XOR<propertiesCreateWithoutBookingsInput, propertiesUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: propertiesCreateOrConnectWithoutBookingsInput
    connect?: propertiesWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutBookingsInput = {
    create?: XOR<usersCreateWithoutBookingsInput, usersUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: usersCreateOrConnectWithoutBookingsInput
    connect?: usersWhereUniqueInput
  }

  export type reviewsCreateNestedManyWithoutBookingInput = {
    create?: XOR<reviewsCreateWithoutBookingInput, reviewsUncheckedCreateWithoutBookingInput> | reviewsCreateWithoutBookingInput[] | reviewsUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutBookingInput | reviewsCreateOrConnectWithoutBookingInput[]
    createMany?: reviewsCreateManyBookingInputEnvelope
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
  }

  export type booking_roomsUncheckedCreateNestedManyWithoutBookingInput = {
    create?: XOR<booking_roomsCreateWithoutBookingInput, booking_roomsUncheckedCreateWithoutBookingInput> | booking_roomsCreateWithoutBookingInput[] | booking_roomsUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: booking_roomsCreateOrConnectWithoutBookingInput | booking_roomsCreateOrConnectWithoutBookingInput[]
    createMany?: booking_roomsCreateManyBookingInputEnvelope
    connect?: booking_roomsWhereUniqueInput | booking_roomsWhereUniqueInput[]
  }

  export type reviewsUncheckedCreateNestedManyWithoutBookingInput = {
    create?: XOR<reviewsCreateWithoutBookingInput, reviewsUncheckedCreateWithoutBookingInput> | reviewsCreateWithoutBookingInput[] | reviewsUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutBookingInput | reviewsCreateOrConnectWithoutBookingInput[]
    createMany?: reviewsCreateManyBookingInputEnvelope
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
  }

  export type EnumBookingStatusFieldUpdateOperationsInput = {
    set?: $Enums.BookingStatus
  }

  export type booking_roomsUpdateManyWithoutBookingNestedInput = {
    create?: XOR<booking_roomsCreateWithoutBookingInput, booking_roomsUncheckedCreateWithoutBookingInput> | booking_roomsCreateWithoutBookingInput[] | booking_roomsUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: booking_roomsCreateOrConnectWithoutBookingInput | booking_roomsCreateOrConnectWithoutBookingInput[]
    upsert?: booking_roomsUpsertWithWhereUniqueWithoutBookingInput | booking_roomsUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: booking_roomsCreateManyBookingInputEnvelope
    set?: booking_roomsWhereUniqueInput | booking_roomsWhereUniqueInput[]
    disconnect?: booking_roomsWhereUniqueInput | booking_roomsWhereUniqueInput[]
    delete?: booking_roomsWhereUniqueInput | booking_roomsWhereUniqueInput[]
    connect?: booking_roomsWhereUniqueInput | booking_roomsWhereUniqueInput[]
    update?: booking_roomsUpdateWithWhereUniqueWithoutBookingInput | booking_roomsUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: booking_roomsUpdateManyWithWhereWithoutBookingInput | booking_roomsUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: booking_roomsScalarWhereInput | booking_roomsScalarWhereInput[]
  }

  export type propertiesUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<propertiesCreateWithoutBookingsInput, propertiesUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: propertiesCreateOrConnectWithoutBookingsInput
    upsert?: propertiesUpsertWithoutBookingsInput
    connect?: propertiesWhereUniqueInput
    update?: XOR<XOR<propertiesUpdateToOneWithWhereWithoutBookingsInput, propertiesUpdateWithoutBookingsInput>, propertiesUncheckedUpdateWithoutBookingsInput>
  }

  export type usersUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<usersCreateWithoutBookingsInput, usersUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: usersCreateOrConnectWithoutBookingsInput
    upsert?: usersUpsertWithoutBookingsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutBookingsInput, usersUpdateWithoutBookingsInput>, usersUncheckedUpdateWithoutBookingsInput>
  }

  export type reviewsUpdateManyWithoutBookingNestedInput = {
    create?: XOR<reviewsCreateWithoutBookingInput, reviewsUncheckedCreateWithoutBookingInput> | reviewsCreateWithoutBookingInput[] | reviewsUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutBookingInput | reviewsCreateOrConnectWithoutBookingInput[]
    upsert?: reviewsUpsertWithWhereUniqueWithoutBookingInput | reviewsUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: reviewsCreateManyBookingInputEnvelope
    set?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    disconnect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    delete?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    update?: reviewsUpdateWithWhereUniqueWithoutBookingInput | reviewsUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: reviewsUpdateManyWithWhereWithoutBookingInput | reviewsUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: reviewsScalarWhereInput | reviewsScalarWhereInput[]
  }

  export type booking_roomsUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: XOR<booking_roomsCreateWithoutBookingInput, booking_roomsUncheckedCreateWithoutBookingInput> | booking_roomsCreateWithoutBookingInput[] | booking_roomsUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: booking_roomsCreateOrConnectWithoutBookingInput | booking_roomsCreateOrConnectWithoutBookingInput[]
    upsert?: booking_roomsUpsertWithWhereUniqueWithoutBookingInput | booking_roomsUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: booking_roomsCreateManyBookingInputEnvelope
    set?: booking_roomsWhereUniqueInput | booking_roomsWhereUniqueInput[]
    disconnect?: booking_roomsWhereUniqueInput | booking_roomsWhereUniqueInput[]
    delete?: booking_roomsWhereUniqueInput | booking_roomsWhereUniqueInput[]
    connect?: booking_roomsWhereUniqueInput | booking_roomsWhereUniqueInput[]
    update?: booking_roomsUpdateWithWhereUniqueWithoutBookingInput | booking_roomsUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: booking_roomsUpdateManyWithWhereWithoutBookingInput | booking_roomsUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: booking_roomsScalarWhereInput | booking_roomsScalarWhereInput[]
  }

  export type reviewsUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: XOR<reviewsCreateWithoutBookingInput, reviewsUncheckedCreateWithoutBookingInput> | reviewsCreateWithoutBookingInput[] | reviewsUncheckedCreateWithoutBookingInput[]
    connectOrCreate?: reviewsCreateOrConnectWithoutBookingInput | reviewsCreateOrConnectWithoutBookingInput[]
    upsert?: reviewsUpsertWithWhereUniqueWithoutBookingInput | reviewsUpsertWithWhereUniqueWithoutBookingInput[]
    createMany?: reviewsCreateManyBookingInputEnvelope
    set?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    disconnect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    delete?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    connect?: reviewsWhereUniqueInput | reviewsWhereUniqueInput[]
    update?: reviewsUpdateWithWhereUniqueWithoutBookingInput | reviewsUpdateWithWhereUniqueWithoutBookingInput[]
    updateMany?: reviewsUpdateManyWithWhereWithoutBookingInput | reviewsUpdateManyWithWhereWithoutBookingInput[]
    deleteMany?: reviewsScalarWhereInput | reviewsScalarWhereInput[]
  }

  export type bookingsCreateNestedOneWithoutBooking_roomsInput = {
    create?: XOR<bookingsCreateWithoutBooking_roomsInput, bookingsUncheckedCreateWithoutBooking_roomsInput>
    connectOrCreate?: bookingsCreateOrConnectWithoutBooking_roomsInput
    connect?: bookingsWhereUniqueInput
  }

  export type roomsCreateNestedOneWithoutBooking_roomsInput = {
    create?: XOR<roomsCreateWithoutBooking_roomsInput, roomsUncheckedCreateWithoutBooking_roomsInput>
    connectOrCreate?: roomsCreateOrConnectWithoutBooking_roomsInput
    connect?: roomsWhereUniqueInput
  }

  export type bookingsUpdateOneRequiredWithoutBooking_roomsNestedInput = {
    create?: XOR<bookingsCreateWithoutBooking_roomsInput, bookingsUncheckedCreateWithoutBooking_roomsInput>
    connectOrCreate?: bookingsCreateOrConnectWithoutBooking_roomsInput
    upsert?: bookingsUpsertWithoutBooking_roomsInput
    connect?: bookingsWhereUniqueInput
    update?: XOR<XOR<bookingsUpdateToOneWithWhereWithoutBooking_roomsInput, bookingsUpdateWithoutBooking_roomsInput>, bookingsUncheckedUpdateWithoutBooking_roomsInput>
  }

  export type roomsUpdateOneRequiredWithoutBooking_roomsNestedInput = {
    create?: XOR<roomsCreateWithoutBooking_roomsInput, roomsUncheckedCreateWithoutBooking_roomsInput>
    connectOrCreate?: roomsCreateOrConnectWithoutBooking_roomsInput
    upsert?: roomsUpsertWithoutBooking_roomsInput
    connect?: roomsWhereUniqueInput
    update?: XOR<XOR<roomsUpdateToOneWithWhereWithoutBooking_roomsInput, roomsUpdateWithoutBooking_roomsInput>, roomsUncheckedUpdateWithoutBooking_roomsInput>
  }

  export type bookingsCreateNestedOneWithoutReviewsInput = {
    create?: XOR<bookingsCreateWithoutReviewsInput, bookingsUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: bookingsCreateOrConnectWithoutReviewsInput
    connect?: bookingsWhereUniqueInput
  }

  export type propertiesCreateNestedOneWithoutReviewsInput = {
    create?: XOR<propertiesCreateWithoutReviewsInput, propertiesUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: propertiesCreateOrConnectWithoutReviewsInput
    connect?: propertiesWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutReviewsInput = {
    create?: XOR<usersCreateWithoutReviewsInput, usersUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: usersCreateOrConnectWithoutReviewsInput
    connect?: usersWhereUniqueInput
  }

  export type bookingsUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<bookingsCreateWithoutReviewsInput, bookingsUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: bookingsCreateOrConnectWithoutReviewsInput
    upsert?: bookingsUpsertWithoutReviewsInput
    connect?: bookingsWhereUniqueInput
    update?: XOR<XOR<bookingsUpdateToOneWithWhereWithoutReviewsInput, bookingsUpdateWithoutReviewsInput>, bookingsUncheckedUpdateWithoutReviewsInput>
  }

  export type propertiesUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<propertiesCreateWithoutReviewsInput, propertiesUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: propertiesCreateOrConnectWithoutReviewsInput
    upsert?: propertiesUpsertWithoutReviewsInput
    connect?: propertiesWhereUniqueInput
    update?: XOR<XOR<propertiesUpdateToOneWithWhereWithoutReviewsInput, propertiesUpdateWithoutReviewsInput>, propertiesUncheckedUpdateWithoutReviewsInput>
  }

  export type usersUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<usersCreateWithoutReviewsInput, usersUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: usersCreateOrConnectWithoutReviewsInput
    upsert?: usersUpsertWithoutReviewsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutReviewsInput, usersUpdateWithoutReviewsInput>, usersUncheckedUpdateWithoutReviewsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumPropertyCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.PropertyCategory | EnumPropertyCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PropertyCategory[] | ListEnumPropertyCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.PropertyCategory[] | ListEnumPropertyCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumPropertyCategoryFilter<$PrismaModel> | $Enums.PropertyCategory
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumPropertyCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PropertyCategory | EnumPropertyCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.PropertyCategory[] | ListEnumPropertyCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.PropertyCategory[] | ListEnumPropertyCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumPropertyCategoryWithAggregatesFilter<$PrismaModel> | $Enums.PropertyCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPropertyCategoryFilter<$PrismaModel>
    _max?: NestedEnumPropertyCategoryFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedEnumPriceChangeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PriceChangeType | EnumPriceChangeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PriceChangeType[] | ListEnumPriceChangeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PriceChangeType[] | ListEnumPriceChangeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPriceChangeTypeFilter<$PrismaModel> | $Enums.PriceChangeType
  }

  export type NestedEnumPriceChangeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PriceChangeType | EnumPriceChangeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PriceChangeType[] | ListEnumPriceChangeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PriceChangeType[] | ListEnumPriceChangeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPriceChangeTypeWithAggregatesFilter<$PrismaModel> | $Enums.PriceChangeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPriceChangeTypeFilter<$PrismaModel>
    _max?: NestedEnumPriceChangeTypeFilter<$PrismaModel>
  }

  export type NestedEnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus
  }

  export type NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | EnumBookingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BookingStatus[] | ListEnumBookingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBookingStatusFilter<$PrismaModel>
    _max?: NestedEnumBookingStatusFilter<$PrismaModel>
  }

  export type bookingsCreateWithoutUserInput = {
    id?: string
    status: $Enums.BookingStatus
    check_in_date: Date | string
    check_out_date: Date | string
    total_price: Decimal | DecimalJsLike | number | string
    payment_deadline?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    amount: Decimal | DecimalJsLike | number | string
    paid_at?: Date | string | null
    proof_image?: string | null
    booking_rooms?: booking_roomsCreateNestedManyWithoutBookingInput
    property: propertiesCreateNestedOneWithoutBookingsInput
    reviews?: reviewsCreateNestedManyWithoutBookingInput
  }

  export type bookingsUncheckedCreateWithoutUserInput = {
    id?: string
    property_id: string
    status: $Enums.BookingStatus
    check_in_date: Date | string
    check_out_date: Date | string
    total_price: Decimal | DecimalJsLike | number | string
    payment_deadline?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    amount: Decimal | DecimalJsLike | number | string
    paid_at?: Date | string | null
    proof_image?: string | null
    booking_rooms?: booking_roomsUncheckedCreateNestedManyWithoutBookingInput
    reviews?: reviewsUncheckedCreateNestedManyWithoutBookingInput
  }

  export type bookingsCreateOrConnectWithoutUserInput = {
    where: bookingsWhereUniqueInput
    create: XOR<bookingsCreateWithoutUserInput, bookingsUncheckedCreateWithoutUserInput>
  }

  export type bookingsCreateManyUserInputEnvelope = {
    data: bookingsCreateManyUserInput | bookingsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type reviewsCreateWithoutUserInput = {
    id?: string
    comment?: string | null
    tenant_reply?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    booking: bookingsCreateNestedOneWithoutReviewsInput
    property: propertiesCreateNestedOneWithoutReviewsInput
  }

  export type reviewsUncheckedCreateWithoutUserInput = {
    id?: string
    booking_id: string
    property_id: string
    comment?: string | null
    tenant_reply?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type reviewsCreateOrConnectWithoutUserInput = {
    where: reviewsWhereUniqueInput
    create: XOR<reviewsCreateWithoutUserInput, reviewsUncheckedCreateWithoutUserInput>
  }

  export type reviewsCreateManyUserInputEnvelope = {
    data: reviewsCreateManyUserInput | reviewsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type tenantsCreateWithoutUserInput = {
    id?: string
    company_name: string
    address: string
    phone_number: string
    logo?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    properties?: propertiesCreateNestedManyWithoutTenantInput
  }

  export type tenantsUncheckedCreateWithoutUserInput = {
    id?: string
    company_name: string
    address: string
    phone_number: string
    logo?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    properties?: propertiesUncheckedCreateNestedManyWithoutTenantInput
  }

  export type tenantsCreateOrConnectWithoutUserInput = {
    where: tenantsWhereUniqueInput
    create: XOR<tenantsCreateWithoutUserInput, tenantsUncheckedCreateWithoutUserInput>
  }

  export type tenantsCreateManyUserInputEnvelope = {
    data: tenantsCreateManyUserInput | tenantsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type bookingsUpsertWithWhereUniqueWithoutUserInput = {
    where: bookingsWhereUniqueInput
    update: XOR<bookingsUpdateWithoutUserInput, bookingsUncheckedUpdateWithoutUserInput>
    create: XOR<bookingsCreateWithoutUserInput, bookingsUncheckedCreateWithoutUserInput>
  }

  export type bookingsUpdateWithWhereUniqueWithoutUserInput = {
    where: bookingsWhereUniqueInput
    data: XOR<bookingsUpdateWithoutUserInput, bookingsUncheckedUpdateWithoutUserInput>
  }

  export type bookingsUpdateManyWithWhereWithoutUserInput = {
    where: bookingsScalarWhereInput
    data: XOR<bookingsUpdateManyMutationInput, bookingsUncheckedUpdateManyWithoutUserInput>
  }

  export type bookingsScalarWhereInput = {
    AND?: bookingsScalarWhereInput | bookingsScalarWhereInput[]
    OR?: bookingsScalarWhereInput[]
    NOT?: bookingsScalarWhereInput | bookingsScalarWhereInput[]
    id?: StringFilter<"bookings"> | string
    user_id?: StringFilter<"bookings"> | string
    property_id?: StringFilter<"bookings"> | string
    status?: EnumBookingStatusFilter<"bookings"> | $Enums.BookingStatus
    check_in_date?: DateTimeFilter<"bookings"> | Date | string
    check_out_date?: DateTimeFilter<"bookings"> | Date | string
    total_price?: DecimalFilter<"bookings"> | Decimal | DecimalJsLike | number | string
    payment_deadline?: DateTimeFilter<"bookings"> | Date | string
    created_at?: DateTimeFilter<"bookings"> | Date | string
    updated_at?: DateTimeFilter<"bookings"> | Date | string
    amount?: DecimalFilter<"bookings"> | Decimal | DecimalJsLike | number | string
    paid_at?: DateTimeNullableFilter<"bookings"> | Date | string | null
    proof_image?: StringNullableFilter<"bookings"> | string | null
  }

  export type reviewsUpsertWithWhereUniqueWithoutUserInput = {
    where: reviewsWhereUniqueInput
    update: XOR<reviewsUpdateWithoutUserInput, reviewsUncheckedUpdateWithoutUserInput>
    create: XOR<reviewsCreateWithoutUserInput, reviewsUncheckedCreateWithoutUserInput>
  }

  export type reviewsUpdateWithWhereUniqueWithoutUserInput = {
    where: reviewsWhereUniqueInput
    data: XOR<reviewsUpdateWithoutUserInput, reviewsUncheckedUpdateWithoutUserInput>
  }

  export type reviewsUpdateManyWithWhereWithoutUserInput = {
    where: reviewsScalarWhereInput
    data: XOR<reviewsUpdateManyMutationInput, reviewsUncheckedUpdateManyWithoutUserInput>
  }

  export type reviewsScalarWhereInput = {
    AND?: reviewsScalarWhereInput | reviewsScalarWhereInput[]
    OR?: reviewsScalarWhereInput[]
    NOT?: reviewsScalarWhereInput | reviewsScalarWhereInput[]
    id?: StringFilter<"reviews"> | string
    booking_id?: StringFilter<"reviews"> | string
    user_id?: StringFilter<"reviews"> | string
    property_id?: StringFilter<"reviews"> | string
    comment?: StringNullableFilter<"reviews"> | string | null
    tenant_reply?: StringNullableFilter<"reviews"> | string | null
    created_at?: DateTimeFilter<"reviews"> | Date | string
    updated_at?: DateTimeFilter<"reviews"> | Date | string
  }

  export type tenantsUpsertWithWhereUniqueWithoutUserInput = {
    where: tenantsWhereUniqueInput
    update: XOR<tenantsUpdateWithoutUserInput, tenantsUncheckedUpdateWithoutUserInput>
    create: XOR<tenantsCreateWithoutUserInput, tenantsUncheckedCreateWithoutUserInput>
  }

  export type tenantsUpdateWithWhereUniqueWithoutUserInput = {
    where: tenantsWhereUniqueInput
    data: XOR<tenantsUpdateWithoutUserInput, tenantsUncheckedUpdateWithoutUserInput>
  }

  export type tenantsUpdateManyWithWhereWithoutUserInput = {
    where: tenantsScalarWhereInput
    data: XOR<tenantsUpdateManyMutationInput, tenantsUncheckedUpdateManyWithoutUserInput>
  }

  export type tenantsScalarWhereInput = {
    AND?: tenantsScalarWhereInput | tenantsScalarWhereInput[]
    OR?: tenantsScalarWhereInput[]
    NOT?: tenantsScalarWhereInput | tenantsScalarWhereInput[]
    id?: StringFilter<"tenants"> | string
    user_id?: StringFilter<"tenants"> | string
    company_name?: StringFilter<"tenants"> | string
    address?: StringFilter<"tenants"> | string
    phone_number?: StringFilter<"tenants"> | string
    logo?: StringNullableFilter<"tenants"> | string | null
    created_at?: DateTimeFilter<"tenants"> | Date | string
    updated_at?: DateTimeFilter<"tenants"> | Date | string
  }

  export type propertiesCreateWithoutTenantInput = {
    id?: string
    name: string
    description?: string | null
    address: string
    city: string
    province: string
    zip_code: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    main_image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    property_category: $Enums.PropertyCategory
    bookings?: bookingsCreateNestedManyWithoutPropertyInput
    peak_season_rates?: peak_season_ratesCreateNestedManyWithoutPropertyInput
    property_images?: property_imagesCreateNestedManyWithoutPropertyInput
    reviews?: reviewsCreateNestedManyWithoutPropertyInput
    rooms?: roomsCreateNestedManyWithoutPropertyInput
  }

  export type propertiesUncheckedCreateWithoutTenantInput = {
    id?: string
    name: string
    description?: string | null
    address: string
    city: string
    province: string
    zip_code: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    main_image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    property_category: $Enums.PropertyCategory
    bookings?: bookingsUncheckedCreateNestedManyWithoutPropertyInput
    peak_season_rates?: peak_season_ratesUncheckedCreateNestedManyWithoutPropertyInput
    property_images?: property_imagesUncheckedCreateNestedManyWithoutPropertyInput
    reviews?: reviewsUncheckedCreateNestedManyWithoutPropertyInput
    rooms?: roomsUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type propertiesCreateOrConnectWithoutTenantInput = {
    where: propertiesWhereUniqueInput
    create: XOR<propertiesCreateWithoutTenantInput, propertiesUncheckedCreateWithoutTenantInput>
  }

  export type propertiesCreateManyTenantInputEnvelope = {
    data: propertiesCreateManyTenantInput | propertiesCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type usersCreateWithoutTenantsInput = {
    id?: string
    role: $Enums.Role
    full_name: string
    email: string
    password_hash: string
    profile_picture?: string | null
    is_verified: boolean
    created_at?: Date | string
    updated_at?: Date | string
    reset_password_otp?: string | null
    verify_otp?: string | null
    verify_otp_expires_at?: Date | string | null
    bookings?: bookingsCreateNestedManyWithoutUserInput
    reviews?: reviewsCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutTenantsInput = {
    id?: string
    role: $Enums.Role
    full_name: string
    email: string
    password_hash: string
    profile_picture?: string | null
    is_verified: boolean
    created_at?: Date | string
    updated_at?: Date | string
    reset_password_otp?: string | null
    verify_otp?: string | null
    verify_otp_expires_at?: Date | string | null
    bookings?: bookingsUncheckedCreateNestedManyWithoutUserInput
    reviews?: reviewsUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutTenantsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutTenantsInput, usersUncheckedCreateWithoutTenantsInput>
  }

  export type propertiesUpsertWithWhereUniqueWithoutTenantInput = {
    where: propertiesWhereUniqueInput
    update: XOR<propertiesUpdateWithoutTenantInput, propertiesUncheckedUpdateWithoutTenantInput>
    create: XOR<propertiesCreateWithoutTenantInput, propertiesUncheckedCreateWithoutTenantInput>
  }

  export type propertiesUpdateWithWhereUniqueWithoutTenantInput = {
    where: propertiesWhereUniqueInput
    data: XOR<propertiesUpdateWithoutTenantInput, propertiesUncheckedUpdateWithoutTenantInput>
  }

  export type propertiesUpdateManyWithWhereWithoutTenantInput = {
    where: propertiesScalarWhereInput
    data: XOR<propertiesUpdateManyMutationInput, propertiesUncheckedUpdateManyWithoutTenantInput>
  }

  export type propertiesScalarWhereInput = {
    AND?: propertiesScalarWhereInput | propertiesScalarWhereInput[]
    OR?: propertiesScalarWhereInput[]
    NOT?: propertiesScalarWhereInput | propertiesScalarWhereInput[]
    id?: StringFilter<"properties"> | string
    tenant_id?: StringFilter<"properties"> | string
    name?: StringFilter<"properties"> | string
    description?: StringNullableFilter<"properties"> | string | null
    address?: StringFilter<"properties"> | string
    city?: StringFilter<"properties"> | string
    province?: StringFilter<"properties"> | string
    zip_code?: StringFilter<"properties"> | string
    latitude?: DecimalFilter<"properties"> | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFilter<"properties"> | Decimal | DecimalJsLike | number | string
    main_image?: StringNullableFilter<"properties"> | string | null
    created_at?: DateTimeFilter<"properties"> | Date | string
    updated_at?: DateTimeFilter<"properties"> | Date | string
    deleted_at?: DateTimeNullableFilter<"properties"> | Date | string | null
    property_category?: EnumPropertyCategoryFilter<"properties"> | $Enums.PropertyCategory
  }

  export type usersUpsertWithoutTenantsInput = {
    update: XOR<usersUpdateWithoutTenantsInput, usersUncheckedUpdateWithoutTenantsInput>
    create: XOR<usersCreateWithoutTenantsInput, usersUncheckedCreateWithoutTenantsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutTenantsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutTenantsInput, usersUncheckedUpdateWithoutTenantsInput>
  }

  export type usersUpdateWithoutTenantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reset_password_otp?: NullableStringFieldUpdateOperationsInput | string | null
    verify_otp?: NullableStringFieldUpdateOperationsInput | string | null
    verify_otp_expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bookings?: bookingsUpdateManyWithoutUserNestedInput
    reviews?: reviewsUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutTenantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reset_password_otp?: NullableStringFieldUpdateOperationsInput | string | null
    verify_otp?: NullableStringFieldUpdateOperationsInput | string | null
    verify_otp_expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bookings?: bookingsUncheckedUpdateManyWithoutUserNestedInput
    reviews?: reviewsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type bookingsCreateWithoutPropertyInput = {
    id?: string
    status: $Enums.BookingStatus
    check_in_date: Date | string
    check_out_date: Date | string
    total_price: Decimal | DecimalJsLike | number | string
    payment_deadline?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    amount: Decimal | DecimalJsLike | number | string
    paid_at?: Date | string | null
    proof_image?: string | null
    booking_rooms?: booking_roomsCreateNestedManyWithoutBookingInput
    user: usersCreateNestedOneWithoutBookingsInput
    reviews?: reviewsCreateNestedManyWithoutBookingInput
  }

  export type bookingsUncheckedCreateWithoutPropertyInput = {
    id?: string
    user_id: string
    status: $Enums.BookingStatus
    check_in_date: Date | string
    check_out_date: Date | string
    total_price: Decimal | DecimalJsLike | number | string
    payment_deadline?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    amount: Decimal | DecimalJsLike | number | string
    paid_at?: Date | string | null
    proof_image?: string | null
    booking_rooms?: booking_roomsUncheckedCreateNestedManyWithoutBookingInput
    reviews?: reviewsUncheckedCreateNestedManyWithoutBookingInput
  }

  export type bookingsCreateOrConnectWithoutPropertyInput = {
    where: bookingsWhereUniqueInput
    create: XOR<bookingsCreateWithoutPropertyInput, bookingsUncheckedCreateWithoutPropertyInput>
  }

  export type bookingsCreateManyPropertyInputEnvelope = {
    data: bookingsCreateManyPropertyInput | bookingsCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type peak_season_ratesCreateWithoutPropertyInput = {
    id?: string
    start_date: Date | string
    end_date: Date | string
    price_change_type: $Enums.PriceChangeType
    price_change_value: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
    room: roomsCreateNestedOneWithoutPeak_season_ratesInput
  }

  export type peak_season_ratesUncheckedCreateWithoutPropertyInput = {
    id?: string
    room_id: string
    start_date: Date | string
    end_date: Date | string
    price_change_type: $Enums.PriceChangeType
    price_change_value: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type peak_season_ratesCreateOrConnectWithoutPropertyInput = {
    where: peak_season_ratesWhereUniqueInput
    create: XOR<peak_season_ratesCreateWithoutPropertyInput, peak_season_ratesUncheckedCreateWithoutPropertyInput>
  }

  export type peak_season_ratesCreateManyPropertyInputEnvelope = {
    data: peak_season_ratesCreateManyPropertyInput | peak_season_ratesCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type tenantsCreateWithoutPropertiesInput = {
    id?: string
    company_name: string
    address: string
    phone_number: string
    logo?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    user: usersCreateNestedOneWithoutTenantsInput
  }

  export type tenantsUncheckedCreateWithoutPropertiesInput = {
    id?: string
    user_id: string
    company_name: string
    address: string
    phone_number: string
    logo?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type tenantsCreateOrConnectWithoutPropertiesInput = {
    where: tenantsWhereUniqueInput
    create: XOR<tenantsCreateWithoutPropertiesInput, tenantsUncheckedCreateWithoutPropertiesInput>
  }

  export type property_imagesCreateWithoutPropertyInput = {
    id?: string
    image_url: string
    created_at?: Date | string
  }

  export type property_imagesUncheckedCreateWithoutPropertyInput = {
    id?: string
    image_url: string
    created_at?: Date | string
  }

  export type property_imagesCreateOrConnectWithoutPropertyInput = {
    where: property_imagesWhereUniqueInput
    create: XOR<property_imagesCreateWithoutPropertyInput, property_imagesUncheckedCreateWithoutPropertyInput>
  }

  export type property_imagesCreateManyPropertyInputEnvelope = {
    data: property_imagesCreateManyPropertyInput | property_imagesCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type reviewsCreateWithoutPropertyInput = {
    id?: string
    comment?: string | null
    tenant_reply?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    booking: bookingsCreateNestedOneWithoutReviewsInput
    user: usersCreateNestedOneWithoutReviewsInput
  }

  export type reviewsUncheckedCreateWithoutPropertyInput = {
    id?: string
    booking_id: string
    user_id: string
    comment?: string | null
    tenant_reply?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type reviewsCreateOrConnectWithoutPropertyInput = {
    where: reviewsWhereUniqueInput
    create: XOR<reviewsCreateWithoutPropertyInput, reviewsUncheckedCreateWithoutPropertyInput>
  }

  export type reviewsCreateManyPropertyInputEnvelope = {
    data: reviewsCreateManyPropertyInput | reviewsCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type roomsCreateWithoutPropertyInput = {
    id?: string
    name: string
    description?: string | null
    base_price: Decimal | DecimalJsLike | number | string
    capacity: number
    image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    total_rooms: number
    booking_rooms?: booking_roomsCreateNestedManyWithoutRoomInput
    peak_season_rates?: peak_season_ratesCreateNestedManyWithoutRoomInput
    room_availability?: room_availabilityCreateNestedManyWithoutRoomInput
    room_images?: room_imagesCreateNestedManyWithoutRoomInput
  }

  export type roomsUncheckedCreateWithoutPropertyInput = {
    id?: string
    name: string
    description?: string | null
    base_price: Decimal | DecimalJsLike | number | string
    capacity: number
    image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    total_rooms: number
    booking_rooms?: booking_roomsUncheckedCreateNestedManyWithoutRoomInput
    peak_season_rates?: peak_season_ratesUncheckedCreateNestedManyWithoutRoomInput
    room_availability?: room_availabilityUncheckedCreateNestedManyWithoutRoomInput
    room_images?: room_imagesUncheckedCreateNestedManyWithoutRoomInput
  }

  export type roomsCreateOrConnectWithoutPropertyInput = {
    where: roomsWhereUniqueInput
    create: XOR<roomsCreateWithoutPropertyInput, roomsUncheckedCreateWithoutPropertyInput>
  }

  export type roomsCreateManyPropertyInputEnvelope = {
    data: roomsCreateManyPropertyInput | roomsCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type bookingsUpsertWithWhereUniqueWithoutPropertyInput = {
    where: bookingsWhereUniqueInput
    update: XOR<bookingsUpdateWithoutPropertyInput, bookingsUncheckedUpdateWithoutPropertyInput>
    create: XOR<bookingsCreateWithoutPropertyInput, bookingsUncheckedCreateWithoutPropertyInput>
  }

  export type bookingsUpdateWithWhereUniqueWithoutPropertyInput = {
    where: bookingsWhereUniqueInput
    data: XOR<bookingsUpdateWithoutPropertyInput, bookingsUncheckedUpdateWithoutPropertyInput>
  }

  export type bookingsUpdateManyWithWhereWithoutPropertyInput = {
    where: bookingsScalarWhereInput
    data: XOR<bookingsUpdateManyMutationInput, bookingsUncheckedUpdateManyWithoutPropertyInput>
  }

  export type peak_season_ratesUpsertWithWhereUniqueWithoutPropertyInput = {
    where: peak_season_ratesWhereUniqueInput
    update: XOR<peak_season_ratesUpdateWithoutPropertyInput, peak_season_ratesUncheckedUpdateWithoutPropertyInput>
    create: XOR<peak_season_ratesCreateWithoutPropertyInput, peak_season_ratesUncheckedCreateWithoutPropertyInput>
  }

  export type peak_season_ratesUpdateWithWhereUniqueWithoutPropertyInput = {
    where: peak_season_ratesWhereUniqueInput
    data: XOR<peak_season_ratesUpdateWithoutPropertyInput, peak_season_ratesUncheckedUpdateWithoutPropertyInput>
  }

  export type peak_season_ratesUpdateManyWithWhereWithoutPropertyInput = {
    where: peak_season_ratesScalarWhereInput
    data: XOR<peak_season_ratesUpdateManyMutationInput, peak_season_ratesUncheckedUpdateManyWithoutPropertyInput>
  }

  export type peak_season_ratesScalarWhereInput = {
    AND?: peak_season_ratesScalarWhereInput | peak_season_ratesScalarWhereInput[]
    OR?: peak_season_ratesScalarWhereInput[]
    NOT?: peak_season_ratesScalarWhereInput | peak_season_ratesScalarWhereInput[]
    id?: StringFilter<"peak_season_rates"> | string
    property_id?: StringFilter<"peak_season_rates"> | string
    room_id?: StringFilter<"peak_season_rates"> | string
    start_date?: DateTimeFilter<"peak_season_rates"> | Date | string
    end_date?: DateTimeFilter<"peak_season_rates"> | Date | string
    price_change_type?: EnumPriceChangeTypeFilter<"peak_season_rates"> | $Enums.PriceChangeType
    price_change_value?: DecimalFilter<"peak_season_rates"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFilter<"peak_season_rates"> | Date | string
    updated_at?: DateTimeFilter<"peak_season_rates"> | Date | string
  }

  export type tenantsUpsertWithoutPropertiesInput = {
    update: XOR<tenantsUpdateWithoutPropertiesInput, tenantsUncheckedUpdateWithoutPropertiesInput>
    create: XOR<tenantsCreateWithoutPropertiesInput, tenantsUncheckedCreateWithoutPropertiesInput>
    where?: tenantsWhereInput
  }

  export type tenantsUpdateToOneWithWhereWithoutPropertiesInput = {
    where?: tenantsWhereInput
    data: XOR<tenantsUpdateWithoutPropertiesInput, tenantsUncheckedUpdateWithoutPropertiesInput>
  }

  export type tenantsUpdateWithoutPropertiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    company_name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: usersUpdateOneRequiredWithoutTenantsNestedInput
  }

  export type tenantsUncheckedUpdateWithoutPropertiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    company_name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type property_imagesUpsertWithWhereUniqueWithoutPropertyInput = {
    where: property_imagesWhereUniqueInput
    update: XOR<property_imagesUpdateWithoutPropertyInput, property_imagesUncheckedUpdateWithoutPropertyInput>
    create: XOR<property_imagesCreateWithoutPropertyInput, property_imagesUncheckedCreateWithoutPropertyInput>
  }

  export type property_imagesUpdateWithWhereUniqueWithoutPropertyInput = {
    where: property_imagesWhereUniqueInput
    data: XOR<property_imagesUpdateWithoutPropertyInput, property_imagesUncheckedUpdateWithoutPropertyInput>
  }

  export type property_imagesUpdateManyWithWhereWithoutPropertyInput = {
    where: property_imagesScalarWhereInput
    data: XOR<property_imagesUpdateManyMutationInput, property_imagesUncheckedUpdateManyWithoutPropertyInput>
  }

  export type property_imagesScalarWhereInput = {
    AND?: property_imagesScalarWhereInput | property_imagesScalarWhereInput[]
    OR?: property_imagesScalarWhereInput[]
    NOT?: property_imagesScalarWhereInput | property_imagesScalarWhereInput[]
    id?: StringFilter<"property_images"> | string
    property_id?: StringFilter<"property_images"> | string
    image_url?: StringFilter<"property_images"> | string
    created_at?: DateTimeFilter<"property_images"> | Date | string
  }

  export type reviewsUpsertWithWhereUniqueWithoutPropertyInput = {
    where: reviewsWhereUniqueInput
    update: XOR<reviewsUpdateWithoutPropertyInput, reviewsUncheckedUpdateWithoutPropertyInput>
    create: XOR<reviewsCreateWithoutPropertyInput, reviewsUncheckedCreateWithoutPropertyInput>
  }

  export type reviewsUpdateWithWhereUniqueWithoutPropertyInput = {
    where: reviewsWhereUniqueInput
    data: XOR<reviewsUpdateWithoutPropertyInput, reviewsUncheckedUpdateWithoutPropertyInput>
  }

  export type reviewsUpdateManyWithWhereWithoutPropertyInput = {
    where: reviewsScalarWhereInput
    data: XOR<reviewsUpdateManyMutationInput, reviewsUncheckedUpdateManyWithoutPropertyInput>
  }

  export type roomsUpsertWithWhereUniqueWithoutPropertyInput = {
    where: roomsWhereUniqueInput
    update: XOR<roomsUpdateWithoutPropertyInput, roomsUncheckedUpdateWithoutPropertyInput>
    create: XOR<roomsCreateWithoutPropertyInput, roomsUncheckedCreateWithoutPropertyInput>
  }

  export type roomsUpdateWithWhereUniqueWithoutPropertyInput = {
    where: roomsWhereUniqueInput
    data: XOR<roomsUpdateWithoutPropertyInput, roomsUncheckedUpdateWithoutPropertyInput>
  }

  export type roomsUpdateManyWithWhereWithoutPropertyInput = {
    where: roomsScalarWhereInput
    data: XOR<roomsUpdateManyMutationInput, roomsUncheckedUpdateManyWithoutPropertyInput>
  }

  export type roomsScalarWhereInput = {
    AND?: roomsScalarWhereInput | roomsScalarWhereInput[]
    OR?: roomsScalarWhereInput[]
    NOT?: roomsScalarWhereInput | roomsScalarWhereInput[]
    id?: StringFilter<"rooms"> | string
    property_id?: StringFilter<"rooms"> | string
    name?: StringFilter<"rooms"> | string
    description?: StringNullableFilter<"rooms"> | string | null
    base_price?: DecimalFilter<"rooms"> | Decimal | DecimalJsLike | number | string
    capacity?: IntFilter<"rooms"> | number
    image?: StringNullableFilter<"rooms"> | string | null
    created_at?: DateTimeFilter<"rooms"> | Date | string
    updated_at?: DateTimeFilter<"rooms"> | Date | string
    deleted_at?: DateTimeNullableFilter<"rooms"> | Date | string | null
    total_rooms?: IntFilter<"rooms"> | number
  }

  export type propertiesCreateWithoutProperty_imagesInput = {
    id?: string
    name: string
    description?: string | null
    address: string
    city: string
    province: string
    zip_code: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    main_image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    property_category: $Enums.PropertyCategory
    bookings?: bookingsCreateNestedManyWithoutPropertyInput
    peak_season_rates?: peak_season_ratesCreateNestedManyWithoutPropertyInput
    tenant: tenantsCreateNestedOneWithoutPropertiesInput
    reviews?: reviewsCreateNestedManyWithoutPropertyInput
    rooms?: roomsCreateNestedManyWithoutPropertyInput
  }

  export type propertiesUncheckedCreateWithoutProperty_imagesInput = {
    id?: string
    tenant_id: string
    name: string
    description?: string | null
    address: string
    city: string
    province: string
    zip_code: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    main_image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    property_category: $Enums.PropertyCategory
    bookings?: bookingsUncheckedCreateNestedManyWithoutPropertyInput
    peak_season_rates?: peak_season_ratesUncheckedCreateNestedManyWithoutPropertyInput
    reviews?: reviewsUncheckedCreateNestedManyWithoutPropertyInput
    rooms?: roomsUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type propertiesCreateOrConnectWithoutProperty_imagesInput = {
    where: propertiesWhereUniqueInput
    create: XOR<propertiesCreateWithoutProperty_imagesInput, propertiesUncheckedCreateWithoutProperty_imagesInput>
  }

  export type propertiesUpsertWithoutProperty_imagesInput = {
    update: XOR<propertiesUpdateWithoutProperty_imagesInput, propertiesUncheckedUpdateWithoutProperty_imagesInput>
    create: XOR<propertiesCreateWithoutProperty_imagesInput, propertiesUncheckedCreateWithoutProperty_imagesInput>
    where?: propertiesWhereInput
  }

  export type propertiesUpdateToOneWithWhereWithoutProperty_imagesInput = {
    where?: propertiesWhereInput
    data: XOR<propertiesUpdateWithoutProperty_imagesInput, propertiesUncheckedUpdateWithoutProperty_imagesInput>
  }

  export type propertiesUpdateWithoutProperty_imagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    main_image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    property_category?: EnumPropertyCategoryFieldUpdateOperationsInput | $Enums.PropertyCategory
    bookings?: bookingsUpdateManyWithoutPropertyNestedInput
    peak_season_rates?: peak_season_ratesUpdateManyWithoutPropertyNestedInput
    tenant?: tenantsUpdateOneRequiredWithoutPropertiesNestedInput
    reviews?: reviewsUpdateManyWithoutPropertyNestedInput
    rooms?: roomsUpdateManyWithoutPropertyNestedInput
  }

  export type propertiesUncheckedUpdateWithoutProperty_imagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    main_image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    property_category?: EnumPropertyCategoryFieldUpdateOperationsInput | $Enums.PropertyCategory
    bookings?: bookingsUncheckedUpdateManyWithoutPropertyNestedInput
    peak_season_rates?: peak_season_ratesUncheckedUpdateManyWithoutPropertyNestedInput
    reviews?: reviewsUncheckedUpdateManyWithoutPropertyNestedInput
    rooms?: roomsUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type booking_roomsCreateWithoutRoomInput = {
    id?: string
    guests_count: number
    price_per_night: Decimal | DecimalJsLike | number | string
    check_in_date: Date | string
    check_out_date: Date | string
    nights: number
    quantity: number
    subtotal: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
    booking: bookingsCreateNestedOneWithoutBooking_roomsInput
  }

  export type booking_roomsUncheckedCreateWithoutRoomInput = {
    id?: string
    booking_id: string
    guests_count: number
    price_per_night: Decimal | DecimalJsLike | number | string
    check_in_date: Date | string
    check_out_date: Date | string
    nights: number
    quantity: number
    subtotal: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type booking_roomsCreateOrConnectWithoutRoomInput = {
    where: booking_roomsWhereUniqueInput
    create: XOR<booking_roomsCreateWithoutRoomInput, booking_roomsUncheckedCreateWithoutRoomInput>
  }

  export type booking_roomsCreateManyRoomInputEnvelope = {
    data: booking_roomsCreateManyRoomInput | booking_roomsCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type peak_season_ratesCreateWithoutRoomInput = {
    id?: string
    start_date: Date | string
    end_date: Date | string
    price_change_type: $Enums.PriceChangeType
    price_change_value: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
    property: propertiesCreateNestedOneWithoutPeak_season_ratesInput
  }

  export type peak_season_ratesUncheckedCreateWithoutRoomInput = {
    id?: string
    property_id: string
    start_date: Date | string
    end_date: Date | string
    price_change_type: $Enums.PriceChangeType
    price_change_value: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type peak_season_ratesCreateOrConnectWithoutRoomInput = {
    where: peak_season_ratesWhereUniqueInput
    create: XOR<peak_season_ratesCreateWithoutRoomInput, peak_season_ratesUncheckedCreateWithoutRoomInput>
  }

  export type peak_season_ratesCreateManyRoomInputEnvelope = {
    data: peak_season_ratesCreateManyRoomInput | peak_season_ratesCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type room_availabilityCreateWithoutRoomInput = {
    id?: string
    date: Date | string
    is_available: boolean
    price_override?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type room_availabilityUncheckedCreateWithoutRoomInput = {
    id?: string
    date: Date | string
    is_available: boolean
    price_override?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type room_availabilityCreateOrConnectWithoutRoomInput = {
    where: room_availabilityWhereUniqueInput
    create: XOR<room_availabilityCreateWithoutRoomInput, room_availabilityUncheckedCreateWithoutRoomInput>
  }

  export type room_availabilityCreateManyRoomInputEnvelope = {
    data: room_availabilityCreateManyRoomInput | room_availabilityCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type room_imagesCreateWithoutRoomInput = {
    id?: string
    image_url: string
    created_at?: Date | string
  }

  export type room_imagesUncheckedCreateWithoutRoomInput = {
    id?: string
    image_url: string
    created_at?: Date | string
  }

  export type room_imagesCreateOrConnectWithoutRoomInput = {
    where: room_imagesWhereUniqueInput
    create: XOR<room_imagesCreateWithoutRoomInput, room_imagesUncheckedCreateWithoutRoomInput>
  }

  export type room_imagesCreateManyRoomInputEnvelope = {
    data: room_imagesCreateManyRoomInput | room_imagesCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type propertiesCreateWithoutRoomsInput = {
    id?: string
    name: string
    description?: string | null
    address: string
    city: string
    province: string
    zip_code: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    main_image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    property_category: $Enums.PropertyCategory
    bookings?: bookingsCreateNestedManyWithoutPropertyInput
    peak_season_rates?: peak_season_ratesCreateNestedManyWithoutPropertyInput
    tenant: tenantsCreateNestedOneWithoutPropertiesInput
    property_images?: property_imagesCreateNestedManyWithoutPropertyInput
    reviews?: reviewsCreateNestedManyWithoutPropertyInput
  }

  export type propertiesUncheckedCreateWithoutRoomsInput = {
    id?: string
    tenant_id: string
    name: string
    description?: string | null
    address: string
    city: string
    province: string
    zip_code: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    main_image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    property_category: $Enums.PropertyCategory
    bookings?: bookingsUncheckedCreateNestedManyWithoutPropertyInput
    peak_season_rates?: peak_season_ratesUncheckedCreateNestedManyWithoutPropertyInput
    property_images?: property_imagesUncheckedCreateNestedManyWithoutPropertyInput
    reviews?: reviewsUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type propertiesCreateOrConnectWithoutRoomsInput = {
    where: propertiesWhereUniqueInput
    create: XOR<propertiesCreateWithoutRoomsInput, propertiesUncheckedCreateWithoutRoomsInput>
  }

  export type booking_roomsUpsertWithWhereUniqueWithoutRoomInput = {
    where: booking_roomsWhereUniqueInput
    update: XOR<booking_roomsUpdateWithoutRoomInput, booking_roomsUncheckedUpdateWithoutRoomInput>
    create: XOR<booking_roomsCreateWithoutRoomInput, booking_roomsUncheckedCreateWithoutRoomInput>
  }

  export type booking_roomsUpdateWithWhereUniqueWithoutRoomInput = {
    where: booking_roomsWhereUniqueInput
    data: XOR<booking_roomsUpdateWithoutRoomInput, booking_roomsUncheckedUpdateWithoutRoomInput>
  }

  export type booking_roomsUpdateManyWithWhereWithoutRoomInput = {
    where: booking_roomsScalarWhereInput
    data: XOR<booking_roomsUpdateManyMutationInput, booking_roomsUncheckedUpdateManyWithoutRoomInput>
  }

  export type booking_roomsScalarWhereInput = {
    AND?: booking_roomsScalarWhereInput | booking_roomsScalarWhereInput[]
    OR?: booking_roomsScalarWhereInput[]
    NOT?: booking_roomsScalarWhereInput | booking_roomsScalarWhereInput[]
    id?: StringFilter<"booking_rooms"> | string
    booking_id?: StringFilter<"booking_rooms"> | string
    room_id?: StringFilter<"booking_rooms"> | string
    guests_count?: IntFilter<"booking_rooms"> | number
    price_per_night?: DecimalFilter<"booking_rooms"> | Decimal | DecimalJsLike | number | string
    check_in_date?: DateTimeFilter<"booking_rooms"> | Date | string
    check_out_date?: DateTimeFilter<"booking_rooms"> | Date | string
    nights?: IntFilter<"booking_rooms"> | number
    quantity?: IntFilter<"booking_rooms"> | number
    subtotal?: DecimalFilter<"booking_rooms"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFilter<"booking_rooms"> | Date | string
    updated_at?: DateTimeFilter<"booking_rooms"> | Date | string
  }

  export type peak_season_ratesUpsertWithWhereUniqueWithoutRoomInput = {
    where: peak_season_ratesWhereUniqueInput
    update: XOR<peak_season_ratesUpdateWithoutRoomInput, peak_season_ratesUncheckedUpdateWithoutRoomInput>
    create: XOR<peak_season_ratesCreateWithoutRoomInput, peak_season_ratesUncheckedCreateWithoutRoomInput>
  }

  export type peak_season_ratesUpdateWithWhereUniqueWithoutRoomInput = {
    where: peak_season_ratesWhereUniqueInput
    data: XOR<peak_season_ratesUpdateWithoutRoomInput, peak_season_ratesUncheckedUpdateWithoutRoomInput>
  }

  export type peak_season_ratesUpdateManyWithWhereWithoutRoomInput = {
    where: peak_season_ratesScalarWhereInput
    data: XOR<peak_season_ratesUpdateManyMutationInput, peak_season_ratesUncheckedUpdateManyWithoutRoomInput>
  }

  export type room_availabilityUpsertWithWhereUniqueWithoutRoomInput = {
    where: room_availabilityWhereUniqueInput
    update: XOR<room_availabilityUpdateWithoutRoomInput, room_availabilityUncheckedUpdateWithoutRoomInput>
    create: XOR<room_availabilityCreateWithoutRoomInput, room_availabilityUncheckedCreateWithoutRoomInput>
  }

  export type room_availabilityUpdateWithWhereUniqueWithoutRoomInput = {
    where: room_availabilityWhereUniqueInput
    data: XOR<room_availabilityUpdateWithoutRoomInput, room_availabilityUncheckedUpdateWithoutRoomInput>
  }

  export type room_availabilityUpdateManyWithWhereWithoutRoomInput = {
    where: room_availabilityScalarWhereInput
    data: XOR<room_availabilityUpdateManyMutationInput, room_availabilityUncheckedUpdateManyWithoutRoomInput>
  }

  export type room_availabilityScalarWhereInput = {
    AND?: room_availabilityScalarWhereInput | room_availabilityScalarWhereInput[]
    OR?: room_availabilityScalarWhereInput[]
    NOT?: room_availabilityScalarWhereInput | room_availabilityScalarWhereInput[]
    id?: StringFilter<"room_availability"> | string
    room_id?: StringFilter<"room_availability"> | string
    date?: DateTimeFilter<"room_availability"> | Date | string
    is_available?: BoolFilter<"room_availability"> | boolean
    price_override?: DecimalNullableFilter<"room_availability"> | Decimal | DecimalJsLike | number | string | null
    created_at?: DateTimeFilter<"room_availability"> | Date | string
    updated_at?: DateTimeFilter<"room_availability"> | Date | string
  }

  export type room_imagesUpsertWithWhereUniqueWithoutRoomInput = {
    where: room_imagesWhereUniqueInput
    update: XOR<room_imagesUpdateWithoutRoomInput, room_imagesUncheckedUpdateWithoutRoomInput>
    create: XOR<room_imagesCreateWithoutRoomInput, room_imagesUncheckedCreateWithoutRoomInput>
  }

  export type room_imagesUpdateWithWhereUniqueWithoutRoomInput = {
    where: room_imagesWhereUniqueInput
    data: XOR<room_imagesUpdateWithoutRoomInput, room_imagesUncheckedUpdateWithoutRoomInput>
  }

  export type room_imagesUpdateManyWithWhereWithoutRoomInput = {
    where: room_imagesScalarWhereInput
    data: XOR<room_imagesUpdateManyMutationInput, room_imagesUncheckedUpdateManyWithoutRoomInput>
  }

  export type room_imagesScalarWhereInput = {
    AND?: room_imagesScalarWhereInput | room_imagesScalarWhereInput[]
    OR?: room_imagesScalarWhereInput[]
    NOT?: room_imagesScalarWhereInput | room_imagesScalarWhereInput[]
    id?: StringFilter<"room_images"> | string
    room_id?: StringFilter<"room_images"> | string
    image_url?: StringFilter<"room_images"> | string
    created_at?: DateTimeFilter<"room_images"> | Date | string
  }

  export type propertiesUpsertWithoutRoomsInput = {
    update: XOR<propertiesUpdateWithoutRoomsInput, propertiesUncheckedUpdateWithoutRoomsInput>
    create: XOR<propertiesCreateWithoutRoomsInput, propertiesUncheckedCreateWithoutRoomsInput>
    where?: propertiesWhereInput
  }

  export type propertiesUpdateToOneWithWhereWithoutRoomsInput = {
    where?: propertiesWhereInput
    data: XOR<propertiesUpdateWithoutRoomsInput, propertiesUncheckedUpdateWithoutRoomsInput>
  }

  export type propertiesUpdateWithoutRoomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    main_image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    property_category?: EnumPropertyCategoryFieldUpdateOperationsInput | $Enums.PropertyCategory
    bookings?: bookingsUpdateManyWithoutPropertyNestedInput
    peak_season_rates?: peak_season_ratesUpdateManyWithoutPropertyNestedInput
    tenant?: tenantsUpdateOneRequiredWithoutPropertiesNestedInput
    property_images?: property_imagesUpdateManyWithoutPropertyNestedInput
    reviews?: reviewsUpdateManyWithoutPropertyNestedInput
  }

  export type propertiesUncheckedUpdateWithoutRoomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    main_image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    property_category?: EnumPropertyCategoryFieldUpdateOperationsInput | $Enums.PropertyCategory
    bookings?: bookingsUncheckedUpdateManyWithoutPropertyNestedInput
    peak_season_rates?: peak_season_ratesUncheckedUpdateManyWithoutPropertyNestedInput
    property_images?: property_imagesUncheckedUpdateManyWithoutPropertyNestedInput
    reviews?: reviewsUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type roomsCreateWithoutRoom_imagesInput = {
    id?: string
    name: string
    description?: string | null
    base_price: Decimal | DecimalJsLike | number | string
    capacity: number
    image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    total_rooms: number
    booking_rooms?: booking_roomsCreateNestedManyWithoutRoomInput
    peak_season_rates?: peak_season_ratesCreateNestedManyWithoutRoomInput
    room_availability?: room_availabilityCreateNestedManyWithoutRoomInput
    property: propertiesCreateNestedOneWithoutRoomsInput
  }

  export type roomsUncheckedCreateWithoutRoom_imagesInput = {
    id?: string
    property_id: string
    name: string
    description?: string | null
    base_price: Decimal | DecimalJsLike | number | string
    capacity: number
    image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    total_rooms: number
    booking_rooms?: booking_roomsUncheckedCreateNestedManyWithoutRoomInput
    peak_season_rates?: peak_season_ratesUncheckedCreateNestedManyWithoutRoomInput
    room_availability?: room_availabilityUncheckedCreateNestedManyWithoutRoomInput
  }

  export type roomsCreateOrConnectWithoutRoom_imagesInput = {
    where: roomsWhereUniqueInput
    create: XOR<roomsCreateWithoutRoom_imagesInput, roomsUncheckedCreateWithoutRoom_imagesInput>
  }

  export type roomsUpsertWithoutRoom_imagesInput = {
    update: XOR<roomsUpdateWithoutRoom_imagesInput, roomsUncheckedUpdateWithoutRoom_imagesInput>
    create: XOR<roomsCreateWithoutRoom_imagesInput, roomsUncheckedCreateWithoutRoom_imagesInput>
    where?: roomsWhereInput
  }

  export type roomsUpdateToOneWithWhereWithoutRoom_imagesInput = {
    where?: roomsWhereInput
    data: XOR<roomsUpdateWithoutRoom_imagesInput, roomsUncheckedUpdateWithoutRoom_imagesInput>
  }

  export type roomsUpdateWithoutRoom_imagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    base_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capacity?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_rooms?: IntFieldUpdateOperationsInput | number
    booking_rooms?: booking_roomsUpdateManyWithoutRoomNestedInput
    peak_season_rates?: peak_season_ratesUpdateManyWithoutRoomNestedInput
    room_availability?: room_availabilityUpdateManyWithoutRoomNestedInput
    property?: propertiesUpdateOneRequiredWithoutRoomsNestedInput
  }

  export type roomsUncheckedUpdateWithoutRoom_imagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    property_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    base_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capacity?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_rooms?: IntFieldUpdateOperationsInput | number
    booking_rooms?: booking_roomsUncheckedUpdateManyWithoutRoomNestedInput
    peak_season_rates?: peak_season_ratesUncheckedUpdateManyWithoutRoomNestedInput
    room_availability?: room_availabilityUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type roomsCreateWithoutRoom_availabilityInput = {
    id?: string
    name: string
    description?: string | null
    base_price: Decimal | DecimalJsLike | number | string
    capacity: number
    image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    total_rooms: number
    booking_rooms?: booking_roomsCreateNestedManyWithoutRoomInput
    peak_season_rates?: peak_season_ratesCreateNestedManyWithoutRoomInput
    room_images?: room_imagesCreateNestedManyWithoutRoomInput
    property: propertiesCreateNestedOneWithoutRoomsInput
  }

  export type roomsUncheckedCreateWithoutRoom_availabilityInput = {
    id?: string
    property_id: string
    name: string
    description?: string | null
    base_price: Decimal | DecimalJsLike | number | string
    capacity: number
    image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    total_rooms: number
    booking_rooms?: booking_roomsUncheckedCreateNestedManyWithoutRoomInput
    peak_season_rates?: peak_season_ratesUncheckedCreateNestedManyWithoutRoomInput
    room_images?: room_imagesUncheckedCreateNestedManyWithoutRoomInput
  }

  export type roomsCreateOrConnectWithoutRoom_availabilityInput = {
    where: roomsWhereUniqueInput
    create: XOR<roomsCreateWithoutRoom_availabilityInput, roomsUncheckedCreateWithoutRoom_availabilityInput>
  }

  export type roomsUpsertWithoutRoom_availabilityInput = {
    update: XOR<roomsUpdateWithoutRoom_availabilityInput, roomsUncheckedUpdateWithoutRoom_availabilityInput>
    create: XOR<roomsCreateWithoutRoom_availabilityInput, roomsUncheckedCreateWithoutRoom_availabilityInput>
    where?: roomsWhereInput
  }

  export type roomsUpdateToOneWithWhereWithoutRoom_availabilityInput = {
    where?: roomsWhereInput
    data: XOR<roomsUpdateWithoutRoom_availabilityInput, roomsUncheckedUpdateWithoutRoom_availabilityInput>
  }

  export type roomsUpdateWithoutRoom_availabilityInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    base_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capacity?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_rooms?: IntFieldUpdateOperationsInput | number
    booking_rooms?: booking_roomsUpdateManyWithoutRoomNestedInput
    peak_season_rates?: peak_season_ratesUpdateManyWithoutRoomNestedInput
    room_images?: room_imagesUpdateManyWithoutRoomNestedInput
    property?: propertiesUpdateOneRequiredWithoutRoomsNestedInput
  }

  export type roomsUncheckedUpdateWithoutRoom_availabilityInput = {
    id?: StringFieldUpdateOperationsInput | string
    property_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    base_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capacity?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_rooms?: IntFieldUpdateOperationsInput | number
    booking_rooms?: booking_roomsUncheckedUpdateManyWithoutRoomNestedInput
    peak_season_rates?: peak_season_ratesUncheckedUpdateManyWithoutRoomNestedInput
    room_images?: room_imagesUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type propertiesCreateWithoutPeak_season_ratesInput = {
    id?: string
    name: string
    description?: string | null
    address: string
    city: string
    province: string
    zip_code: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    main_image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    property_category: $Enums.PropertyCategory
    bookings?: bookingsCreateNestedManyWithoutPropertyInput
    tenant: tenantsCreateNestedOneWithoutPropertiesInput
    property_images?: property_imagesCreateNestedManyWithoutPropertyInput
    reviews?: reviewsCreateNestedManyWithoutPropertyInput
    rooms?: roomsCreateNestedManyWithoutPropertyInput
  }

  export type propertiesUncheckedCreateWithoutPeak_season_ratesInput = {
    id?: string
    tenant_id: string
    name: string
    description?: string | null
    address: string
    city: string
    province: string
    zip_code: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    main_image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    property_category: $Enums.PropertyCategory
    bookings?: bookingsUncheckedCreateNestedManyWithoutPropertyInput
    property_images?: property_imagesUncheckedCreateNestedManyWithoutPropertyInput
    reviews?: reviewsUncheckedCreateNestedManyWithoutPropertyInput
    rooms?: roomsUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type propertiesCreateOrConnectWithoutPeak_season_ratesInput = {
    where: propertiesWhereUniqueInput
    create: XOR<propertiesCreateWithoutPeak_season_ratesInput, propertiesUncheckedCreateWithoutPeak_season_ratesInput>
  }

  export type roomsCreateWithoutPeak_season_ratesInput = {
    id?: string
    name: string
    description?: string | null
    base_price: Decimal | DecimalJsLike | number | string
    capacity: number
    image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    total_rooms: number
    booking_rooms?: booking_roomsCreateNestedManyWithoutRoomInput
    room_availability?: room_availabilityCreateNestedManyWithoutRoomInput
    room_images?: room_imagesCreateNestedManyWithoutRoomInput
    property: propertiesCreateNestedOneWithoutRoomsInput
  }

  export type roomsUncheckedCreateWithoutPeak_season_ratesInput = {
    id?: string
    property_id: string
    name: string
    description?: string | null
    base_price: Decimal | DecimalJsLike | number | string
    capacity: number
    image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    total_rooms: number
    booking_rooms?: booking_roomsUncheckedCreateNestedManyWithoutRoomInput
    room_availability?: room_availabilityUncheckedCreateNestedManyWithoutRoomInput
    room_images?: room_imagesUncheckedCreateNestedManyWithoutRoomInput
  }

  export type roomsCreateOrConnectWithoutPeak_season_ratesInput = {
    where: roomsWhereUniqueInput
    create: XOR<roomsCreateWithoutPeak_season_ratesInput, roomsUncheckedCreateWithoutPeak_season_ratesInput>
  }

  export type propertiesUpsertWithoutPeak_season_ratesInput = {
    update: XOR<propertiesUpdateWithoutPeak_season_ratesInput, propertiesUncheckedUpdateWithoutPeak_season_ratesInput>
    create: XOR<propertiesCreateWithoutPeak_season_ratesInput, propertiesUncheckedCreateWithoutPeak_season_ratesInput>
    where?: propertiesWhereInput
  }

  export type propertiesUpdateToOneWithWhereWithoutPeak_season_ratesInput = {
    where?: propertiesWhereInput
    data: XOR<propertiesUpdateWithoutPeak_season_ratesInput, propertiesUncheckedUpdateWithoutPeak_season_ratesInput>
  }

  export type propertiesUpdateWithoutPeak_season_ratesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    main_image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    property_category?: EnumPropertyCategoryFieldUpdateOperationsInput | $Enums.PropertyCategory
    bookings?: bookingsUpdateManyWithoutPropertyNestedInput
    tenant?: tenantsUpdateOneRequiredWithoutPropertiesNestedInput
    property_images?: property_imagesUpdateManyWithoutPropertyNestedInput
    reviews?: reviewsUpdateManyWithoutPropertyNestedInput
    rooms?: roomsUpdateManyWithoutPropertyNestedInput
  }

  export type propertiesUncheckedUpdateWithoutPeak_season_ratesInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    main_image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    property_category?: EnumPropertyCategoryFieldUpdateOperationsInput | $Enums.PropertyCategory
    bookings?: bookingsUncheckedUpdateManyWithoutPropertyNestedInput
    property_images?: property_imagesUncheckedUpdateManyWithoutPropertyNestedInput
    reviews?: reviewsUncheckedUpdateManyWithoutPropertyNestedInput
    rooms?: roomsUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type roomsUpsertWithoutPeak_season_ratesInput = {
    update: XOR<roomsUpdateWithoutPeak_season_ratesInput, roomsUncheckedUpdateWithoutPeak_season_ratesInput>
    create: XOR<roomsCreateWithoutPeak_season_ratesInput, roomsUncheckedCreateWithoutPeak_season_ratesInput>
    where?: roomsWhereInput
  }

  export type roomsUpdateToOneWithWhereWithoutPeak_season_ratesInput = {
    where?: roomsWhereInput
    data: XOR<roomsUpdateWithoutPeak_season_ratesInput, roomsUncheckedUpdateWithoutPeak_season_ratesInput>
  }

  export type roomsUpdateWithoutPeak_season_ratesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    base_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capacity?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_rooms?: IntFieldUpdateOperationsInput | number
    booking_rooms?: booking_roomsUpdateManyWithoutRoomNestedInput
    room_availability?: room_availabilityUpdateManyWithoutRoomNestedInput
    room_images?: room_imagesUpdateManyWithoutRoomNestedInput
    property?: propertiesUpdateOneRequiredWithoutRoomsNestedInput
  }

  export type roomsUncheckedUpdateWithoutPeak_season_ratesInput = {
    id?: StringFieldUpdateOperationsInput | string
    property_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    base_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capacity?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_rooms?: IntFieldUpdateOperationsInput | number
    booking_rooms?: booking_roomsUncheckedUpdateManyWithoutRoomNestedInput
    room_availability?: room_availabilityUncheckedUpdateManyWithoutRoomNestedInput
    room_images?: room_imagesUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type booking_roomsCreateWithoutBookingInput = {
    id?: string
    guests_count: number
    price_per_night: Decimal | DecimalJsLike | number | string
    check_in_date: Date | string
    check_out_date: Date | string
    nights: number
    quantity: number
    subtotal: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
    room: roomsCreateNestedOneWithoutBooking_roomsInput
  }

  export type booking_roomsUncheckedCreateWithoutBookingInput = {
    id?: string
    room_id: string
    guests_count: number
    price_per_night: Decimal | DecimalJsLike | number | string
    check_in_date: Date | string
    check_out_date: Date | string
    nights: number
    quantity: number
    subtotal: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type booking_roomsCreateOrConnectWithoutBookingInput = {
    where: booking_roomsWhereUniqueInput
    create: XOR<booking_roomsCreateWithoutBookingInput, booking_roomsUncheckedCreateWithoutBookingInput>
  }

  export type booking_roomsCreateManyBookingInputEnvelope = {
    data: booking_roomsCreateManyBookingInput | booking_roomsCreateManyBookingInput[]
    skipDuplicates?: boolean
  }

  export type propertiesCreateWithoutBookingsInput = {
    id?: string
    name: string
    description?: string | null
    address: string
    city: string
    province: string
    zip_code: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    main_image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    property_category: $Enums.PropertyCategory
    peak_season_rates?: peak_season_ratesCreateNestedManyWithoutPropertyInput
    tenant: tenantsCreateNestedOneWithoutPropertiesInput
    property_images?: property_imagesCreateNestedManyWithoutPropertyInput
    reviews?: reviewsCreateNestedManyWithoutPropertyInput
    rooms?: roomsCreateNestedManyWithoutPropertyInput
  }

  export type propertiesUncheckedCreateWithoutBookingsInput = {
    id?: string
    tenant_id: string
    name: string
    description?: string | null
    address: string
    city: string
    province: string
    zip_code: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    main_image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    property_category: $Enums.PropertyCategory
    peak_season_rates?: peak_season_ratesUncheckedCreateNestedManyWithoutPropertyInput
    property_images?: property_imagesUncheckedCreateNestedManyWithoutPropertyInput
    reviews?: reviewsUncheckedCreateNestedManyWithoutPropertyInput
    rooms?: roomsUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type propertiesCreateOrConnectWithoutBookingsInput = {
    where: propertiesWhereUniqueInput
    create: XOR<propertiesCreateWithoutBookingsInput, propertiesUncheckedCreateWithoutBookingsInput>
  }

  export type usersCreateWithoutBookingsInput = {
    id?: string
    role: $Enums.Role
    full_name: string
    email: string
    password_hash: string
    profile_picture?: string | null
    is_verified: boolean
    created_at?: Date | string
    updated_at?: Date | string
    reset_password_otp?: string | null
    verify_otp?: string | null
    verify_otp_expires_at?: Date | string | null
    reviews?: reviewsCreateNestedManyWithoutUserInput
    tenants?: tenantsCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutBookingsInput = {
    id?: string
    role: $Enums.Role
    full_name: string
    email: string
    password_hash: string
    profile_picture?: string | null
    is_verified: boolean
    created_at?: Date | string
    updated_at?: Date | string
    reset_password_otp?: string | null
    verify_otp?: string | null
    verify_otp_expires_at?: Date | string | null
    reviews?: reviewsUncheckedCreateNestedManyWithoutUserInput
    tenants?: tenantsUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutBookingsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutBookingsInput, usersUncheckedCreateWithoutBookingsInput>
  }

  export type reviewsCreateWithoutBookingInput = {
    id?: string
    comment?: string | null
    tenant_reply?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    property: propertiesCreateNestedOneWithoutReviewsInput
    user: usersCreateNestedOneWithoutReviewsInput
  }

  export type reviewsUncheckedCreateWithoutBookingInput = {
    id?: string
    user_id: string
    property_id: string
    comment?: string | null
    tenant_reply?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type reviewsCreateOrConnectWithoutBookingInput = {
    where: reviewsWhereUniqueInput
    create: XOR<reviewsCreateWithoutBookingInput, reviewsUncheckedCreateWithoutBookingInput>
  }

  export type reviewsCreateManyBookingInputEnvelope = {
    data: reviewsCreateManyBookingInput | reviewsCreateManyBookingInput[]
    skipDuplicates?: boolean
  }

  export type booking_roomsUpsertWithWhereUniqueWithoutBookingInput = {
    where: booking_roomsWhereUniqueInput
    update: XOR<booking_roomsUpdateWithoutBookingInput, booking_roomsUncheckedUpdateWithoutBookingInput>
    create: XOR<booking_roomsCreateWithoutBookingInput, booking_roomsUncheckedCreateWithoutBookingInput>
  }

  export type booking_roomsUpdateWithWhereUniqueWithoutBookingInput = {
    where: booking_roomsWhereUniqueInput
    data: XOR<booking_roomsUpdateWithoutBookingInput, booking_roomsUncheckedUpdateWithoutBookingInput>
  }

  export type booking_roomsUpdateManyWithWhereWithoutBookingInput = {
    where: booking_roomsScalarWhereInput
    data: XOR<booking_roomsUpdateManyMutationInput, booking_roomsUncheckedUpdateManyWithoutBookingInput>
  }

  export type propertiesUpsertWithoutBookingsInput = {
    update: XOR<propertiesUpdateWithoutBookingsInput, propertiesUncheckedUpdateWithoutBookingsInput>
    create: XOR<propertiesCreateWithoutBookingsInput, propertiesUncheckedCreateWithoutBookingsInput>
    where?: propertiesWhereInput
  }

  export type propertiesUpdateToOneWithWhereWithoutBookingsInput = {
    where?: propertiesWhereInput
    data: XOR<propertiesUpdateWithoutBookingsInput, propertiesUncheckedUpdateWithoutBookingsInput>
  }

  export type propertiesUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    main_image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    property_category?: EnumPropertyCategoryFieldUpdateOperationsInput | $Enums.PropertyCategory
    peak_season_rates?: peak_season_ratesUpdateManyWithoutPropertyNestedInput
    tenant?: tenantsUpdateOneRequiredWithoutPropertiesNestedInput
    property_images?: property_imagesUpdateManyWithoutPropertyNestedInput
    reviews?: reviewsUpdateManyWithoutPropertyNestedInput
    rooms?: roomsUpdateManyWithoutPropertyNestedInput
  }

  export type propertiesUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    main_image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    property_category?: EnumPropertyCategoryFieldUpdateOperationsInput | $Enums.PropertyCategory
    peak_season_rates?: peak_season_ratesUncheckedUpdateManyWithoutPropertyNestedInput
    property_images?: property_imagesUncheckedUpdateManyWithoutPropertyNestedInput
    reviews?: reviewsUncheckedUpdateManyWithoutPropertyNestedInput
    rooms?: roomsUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type usersUpsertWithoutBookingsInput = {
    update: XOR<usersUpdateWithoutBookingsInput, usersUncheckedUpdateWithoutBookingsInput>
    create: XOR<usersCreateWithoutBookingsInput, usersUncheckedCreateWithoutBookingsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutBookingsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutBookingsInput, usersUncheckedUpdateWithoutBookingsInput>
  }

  export type usersUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reset_password_otp?: NullableStringFieldUpdateOperationsInput | string | null
    verify_otp?: NullableStringFieldUpdateOperationsInput | string | null
    verify_otp_expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviews?: reviewsUpdateManyWithoutUserNestedInput
    tenants?: tenantsUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reset_password_otp?: NullableStringFieldUpdateOperationsInput | string | null
    verify_otp?: NullableStringFieldUpdateOperationsInput | string | null
    verify_otp_expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviews?: reviewsUncheckedUpdateManyWithoutUserNestedInput
    tenants?: tenantsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type reviewsUpsertWithWhereUniqueWithoutBookingInput = {
    where: reviewsWhereUniqueInput
    update: XOR<reviewsUpdateWithoutBookingInput, reviewsUncheckedUpdateWithoutBookingInput>
    create: XOR<reviewsCreateWithoutBookingInput, reviewsUncheckedCreateWithoutBookingInput>
  }

  export type reviewsUpdateWithWhereUniqueWithoutBookingInput = {
    where: reviewsWhereUniqueInput
    data: XOR<reviewsUpdateWithoutBookingInput, reviewsUncheckedUpdateWithoutBookingInput>
  }

  export type reviewsUpdateManyWithWhereWithoutBookingInput = {
    where: reviewsScalarWhereInput
    data: XOR<reviewsUpdateManyMutationInput, reviewsUncheckedUpdateManyWithoutBookingInput>
  }

  export type bookingsCreateWithoutBooking_roomsInput = {
    id?: string
    status: $Enums.BookingStatus
    check_in_date: Date | string
    check_out_date: Date | string
    total_price: Decimal | DecimalJsLike | number | string
    payment_deadline?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    amount: Decimal | DecimalJsLike | number | string
    paid_at?: Date | string | null
    proof_image?: string | null
    property: propertiesCreateNestedOneWithoutBookingsInput
    user: usersCreateNestedOneWithoutBookingsInput
    reviews?: reviewsCreateNestedManyWithoutBookingInput
  }

  export type bookingsUncheckedCreateWithoutBooking_roomsInput = {
    id?: string
    user_id: string
    property_id: string
    status: $Enums.BookingStatus
    check_in_date: Date | string
    check_out_date: Date | string
    total_price: Decimal | DecimalJsLike | number | string
    payment_deadline?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    amount: Decimal | DecimalJsLike | number | string
    paid_at?: Date | string | null
    proof_image?: string | null
    reviews?: reviewsUncheckedCreateNestedManyWithoutBookingInput
  }

  export type bookingsCreateOrConnectWithoutBooking_roomsInput = {
    where: bookingsWhereUniqueInput
    create: XOR<bookingsCreateWithoutBooking_roomsInput, bookingsUncheckedCreateWithoutBooking_roomsInput>
  }

  export type roomsCreateWithoutBooking_roomsInput = {
    id?: string
    name: string
    description?: string | null
    base_price: Decimal | DecimalJsLike | number | string
    capacity: number
    image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    total_rooms: number
    peak_season_rates?: peak_season_ratesCreateNestedManyWithoutRoomInput
    room_availability?: room_availabilityCreateNestedManyWithoutRoomInput
    room_images?: room_imagesCreateNestedManyWithoutRoomInput
    property: propertiesCreateNestedOneWithoutRoomsInput
  }

  export type roomsUncheckedCreateWithoutBooking_roomsInput = {
    id?: string
    property_id: string
    name: string
    description?: string | null
    base_price: Decimal | DecimalJsLike | number | string
    capacity: number
    image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    total_rooms: number
    peak_season_rates?: peak_season_ratesUncheckedCreateNestedManyWithoutRoomInput
    room_availability?: room_availabilityUncheckedCreateNestedManyWithoutRoomInput
    room_images?: room_imagesUncheckedCreateNestedManyWithoutRoomInput
  }

  export type roomsCreateOrConnectWithoutBooking_roomsInput = {
    where: roomsWhereUniqueInput
    create: XOR<roomsCreateWithoutBooking_roomsInput, roomsUncheckedCreateWithoutBooking_roomsInput>
  }

  export type bookingsUpsertWithoutBooking_roomsInput = {
    update: XOR<bookingsUpdateWithoutBooking_roomsInput, bookingsUncheckedUpdateWithoutBooking_roomsInput>
    create: XOR<bookingsCreateWithoutBooking_roomsInput, bookingsUncheckedCreateWithoutBooking_roomsInput>
    where?: bookingsWhereInput
  }

  export type bookingsUpdateToOneWithWhereWithoutBooking_roomsInput = {
    where?: bookingsWhereInput
    data: XOR<bookingsUpdateWithoutBooking_roomsInput, bookingsUncheckedUpdateWithoutBooking_roomsInput>
  }

  export type bookingsUpdateWithoutBooking_roomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    check_in_date?: DateTimeFieldUpdateOperationsInput | Date | string
    check_out_date?: DateTimeFieldUpdateOperationsInput | Date | string
    total_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    proof_image?: NullableStringFieldUpdateOperationsInput | string | null
    property?: propertiesUpdateOneRequiredWithoutBookingsNestedInput
    user?: usersUpdateOneRequiredWithoutBookingsNestedInput
    reviews?: reviewsUpdateManyWithoutBookingNestedInput
  }

  export type bookingsUncheckedUpdateWithoutBooking_roomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    property_id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    check_in_date?: DateTimeFieldUpdateOperationsInput | Date | string
    check_out_date?: DateTimeFieldUpdateOperationsInput | Date | string
    total_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    proof_image?: NullableStringFieldUpdateOperationsInput | string | null
    reviews?: reviewsUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type roomsUpsertWithoutBooking_roomsInput = {
    update: XOR<roomsUpdateWithoutBooking_roomsInput, roomsUncheckedUpdateWithoutBooking_roomsInput>
    create: XOR<roomsCreateWithoutBooking_roomsInput, roomsUncheckedCreateWithoutBooking_roomsInput>
    where?: roomsWhereInput
  }

  export type roomsUpdateToOneWithWhereWithoutBooking_roomsInput = {
    where?: roomsWhereInput
    data: XOR<roomsUpdateWithoutBooking_roomsInput, roomsUncheckedUpdateWithoutBooking_roomsInput>
  }

  export type roomsUpdateWithoutBooking_roomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    base_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capacity?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_rooms?: IntFieldUpdateOperationsInput | number
    peak_season_rates?: peak_season_ratesUpdateManyWithoutRoomNestedInput
    room_availability?: room_availabilityUpdateManyWithoutRoomNestedInput
    room_images?: room_imagesUpdateManyWithoutRoomNestedInput
    property?: propertiesUpdateOneRequiredWithoutRoomsNestedInput
  }

  export type roomsUncheckedUpdateWithoutBooking_roomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    property_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    base_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capacity?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_rooms?: IntFieldUpdateOperationsInput | number
    peak_season_rates?: peak_season_ratesUncheckedUpdateManyWithoutRoomNestedInput
    room_availability?: room_availabilityUncheckedUpdateManyWithoutRoomNestedInput
    room_images?: room_imagesUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type bookingsCreateWithoutReviewsInput = {
    id?: string
    status: $Enums.BookingStatus
    check_in_date: Date | string
    check_out_date: Date | string
    total_price: Decimal | DecimalJsLike | number | string
    payment_deadline?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    amount: Decimal | DecimalJsLike | number | string
    paid_at?: Date | string | null
    proof_image?: string | null
    booking_rooms?: booking_roomsCreateNestedManyWithoutBookingInput
    property: propertiesCreateNestedOneWithoutBookingsInput
    user: usersCreateNestedOneWithoutBookingsInput
  }

  export type bookingsUncheckedCreateWithoutReviewsInput = {
    id?: string
    user_id: string
    property_id: string
    status: $Enums.BookingStatus
    check_in_date: Date | string
    check_out_date: Date | string
    total_price: Decimal | DecimalJsLike | number | string
    payment_deadline?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    amount: Decimal | DecimalJsLike | number | string
    paid_at?: Date | string | null
    proof_image?: string | null
    booking_rooms?: booking_roomsUncheckedCreateNestedManyWithoutBookingInput
  }

  export type bookingsCreateOrConnectWithoutReviewsInput = {
    where: bookingsWhereUniqueInput
    create: XOR<bookingsCreateWithoutReviewsInput, bookingsUncheckedCreateWithoutReviewsInput>
  }

  export type propertiesCreateWithoutReviewsInput = {
    id?: string
    name: string
    description?: string | null
    address: string
    city: string
    province: string
    zip_code: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    main_image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    property_category: $Enums.PropertyCategory
    bookings?: bookingsCreateNestedManyWithoutPropertyInput
    peak_season_rates?: peak_season_ratesCreateNestedManyWithoutPropertyInput
    tenant: tenantsCreateNestedOneWithoutPropertiesInput
    property_images?: property_imagesCreateNestedManyWithoutPropertyInput
    rooms?: roomsCreateNestedManyWithoutPropertyInput
  }

  export type propertiesUncheckedCreateWithoutReviewsInput = {
    id?: string
    tenant_id: string
    name: string
    description?: string | null
    address: string
    city: string
    province: string
    zip_code: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    main_image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    property_category: $Enums.PropertyCategory
    bookings?: bookingsUncheckedCreateNestedManyWithoutPropertyInput
    peak_season_rates?: peak_season_ratesUncheckedCreateNestedManyWithoutPropertyInput
    property_images?: property_imagesUncheckedCreateNestedManyWithoutPropertyInput
    rooms?: roomsUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type propertiesCreateOrConnectWithoutReviewsInput = {
    where: propertiesWhereUniqueInput
    create: XOR<propertiesCreateWithoutReviewsInput, propertiesUncheckedCreateWithoutReviewsInput>
  }

  export type usersCreateWithoutReviewsInput = {
    id?: string
    role: $Enums.Role
    full_name: string
    email: string
    password_hash: string
    profile_picture?: string | null
    is_verified: boolean
    created_at?: Date | string
    updated_at?: Date | string
    reset_password_otp?: string | null
    verify_otp?: string | null
    verify_otp_expires_at?: Date | string | null
    bookings?: bookingsCreateNestedManyWithoutUserInput
    tenants?: tenantsCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutReviewsInput = {
    id?: string
    role: $Enums.Role
    full_name: string
    email: string
    password_hash: string
    profile_picture?: string | null
    is_verified: boolean
    created_at?: Date | string
    updated_at?: Date | string
    reset_password_otp?: string | null
    verify_otp?: string | null
    verify_otp_expires_at?: Date | string | null
    bookings?: bookingsUncheckedCreateNestedManyWithoutUserInput
    tenants?: tenantsUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutReviewsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutReviewsInput, usersUncheckedCreateWithoutReviewsInput>
  }

  export type bookingsUpsertWithoutReviewsInput = {
    update: XOR<bookingsUpdateWithoutReviewsInput, bookingsUncheckedUpdateWithoutReviewsInput>
    create: XOR<bookingsCreateWithoutReviewsInput, bookingsUncheckedCreateWithoutReviewsInput>
    where?: bookingsWhereInput
  }

  export type bookingsUpdateToOneWithWhereWithoutReviewsInput = {
    where?: bookingsWhereInput
    data: XOR<bookingsUpdateWithoutReviewsInput, bookingsUncheckedUpdateWithoutReviewsInput>
  }

  export type bookingsUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    check_in_date?: DateTimeFieldUpdateOperationsInput | Date | string
    check_out_date?: DateTimeFieldUpdateOperationsInput | Date | string
    total_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    proof_image?: NullableStringFieldUpdateOperationsInput | string | null
    booking_rooms?: booking_roomsUpdateManyWithoutBookingNestedInput
    property?: propertiesUpdateOneRequiredWithoutBookingsNestedInput
    user?: usersUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type bookingsUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    property_id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    check_in_date?: DateTimeFieldUpdateOperationsInput | Date | string
    check_out_date?: DateTimeFieldUpdateOperationsInput | Date | string
    total_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    proof_image?: NullableStringFieldUpdateOperationsInput | string | null
    booking_rooms?: booking_roomsUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type propertiesUpsertWithoutReviewsInput = {
    update: XOR<propertiesUpdateWithoutReviewsInput, propertiesUncheckedUpdateWithoutReviewsInput>
    create: XOR<propertiesCreateWithoutReviewsInput, propertiesUncheckedCreateWithoutReviewsInput>
    where?: propertiesWhereInput
  }

  export type propertiesUpdateToOneWithWhereWithoutReviewsInput = {
    where?: propertiesWhereInput
    data: XOR<propertiesUpdateWithoutReviewsInput, propertiesUncheckedUpdateWithoutReviewsInput>
  }

  export type propertiesUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    main_image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    property_category?: EnumPropertyCategoryFieldUpdateOperationsInput | $Enums.PropertyCategory
    bookings?: bookingsUpdateManyWithoutPropertyNestedInput
    peak_season_rates?: peak_season_ratesUpdateManyWithoutPropertyNestedInput
    tenant?: tenantsUpdateOneRequiredWithoutPropertiesNestedInput
    property_images?: property_imagesUpdateManyWithoutPropertyNestedInput
    rooms?: roomsUpdateManyWithoutPropertyNestedInput
  }

  export type propertiesUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    tenant_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    main_image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    property_category?: EnumPropertyCategoryFieldUpdateOperationsInput | $Enums.PropertyCategory
    bookings?: bookingsUncheckedUpdateManyWithoutPropertyNestedInput
    peak_season_rates?: peak_season_ratesUncheckedUpdateManyWithoutPropertyNestedInput
    property_images?: property_imagesUncheckedUpdateManyWithoutPropertyNestedInput
    rooms?: roomsUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type usersUpsertWithoutReviewsInput = {
    update: XOR<usersUpdateWithoutReviewsInput, usersUncheckedUpdateWithoutReviewsInput>
    create: XOR<usersCreateWithoutReviewsInput, usersUncheckedCreateWithoutReviewsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutReviewsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutReviewsInput, usersUncheckedUpdateWithoutReviewsInput>
  }

  export type usersUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reset_password_otp?: NullableStringFieldUpdateOperationsInput | string | null
    verify_otp?: NullableStringFieldUpdateOperationsInput | string | null
    verify_otp_expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bookings?: bookingsUpdateManyWithoutUserNestedInput
    tenants?: tenantsUpdateManyWithoutUserNestedInput
  }

  export type usersUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    full_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    profile_picture?: NullableStringFieldUpdateOperationsInput | string | null
    is_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    reset_password_otp?: NullableStringFieldUpdateOperationsInput | string | null
    verify_otp?: NullableStringFieldUpdateOperationsInput | string | null
    verify_otp_expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bookings?: bookingsUncheckedUpdateManyWithoutUserNestedInput
    tenants?: tenantsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type bookingsCreateManyUserInput = {
    id?: string
    property_id: string
    status: $Enums.BookingStatus
    check_in_date: Date | string
    check_out_date: Date | string
    total_price: Decimal | DecimalJsLike | number | string
    payment_deadline?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    amount: Decimal | DecimalJsLike | number | string
    paid_at?: Date | string | null
    proof_image?: string | null
  }

  export type reviewsCreateManyUserInput = {
    id?: string
    booking_id: string
    property_id: string
    comment?: string | null
    tenant_reply?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type tenantsCreateManyUserInput = {
    id?: string
    company_name: string
    address: string
    phone_number: string
    logo?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type bookingsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    check_in_date?: DateTimeFieldUpdateOperationsInput | Date | string
    check_out_date?: DateTimeFieldUpdateOperationsInput | Date | string
    total_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    proof_image?: NullableStringFieldUpdateOperationsInput | string | null
    booking_rooms?: booking_roomsUpdateManyWithoutBookingNestedInput
    property?: propertiesUpdateOneRequiredWithoutBookingsNestedInput
    reviews?: reviewsUpdateManyWithoutBookingNestedInput
  }

  export type bookingsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    property_id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    check_in_date?: DateTimeFieldUpdateOperationsInput | Date | string
    check_out_date?: DateTimeFieldUpdateOperationsInput | Date | string
    total_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    proof_image?: NullableStringFieldUpdateOperationsInput | string | null
    booking_rooms?: booking_roomsUncheckedUpdateManyWithoutBookingNestedInput
    reviews?: reviewsUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type bookingsUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    property_id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    check_in_date?: DateTimeFieldUpdateOperationsInput | Date | string
    check_out_date?: DateTimeFieldUpdateOperationsInput | Date | string
    total_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    proof_image?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type reviewsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    tenant_reply?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: bookingsUpdateOneRequiredWithoutReviewsNestedInput
    property?: propertiesUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type reviewsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    booking_id?: StringFieldUpdateOperationsInput | string
    property_id?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    tenant_reply?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type reviewsUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    booking_id?: StringFieldUpdateOperationsInput | string
    property_id?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    tenant_reply?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tenantsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    company_name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    properties?: propertiesUpdateManyWithoutTenantNestedInput
  }

  export type tenantsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    company_name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    properties?: propertiesUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type tenantsUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    company_name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone_number?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type propertiesCreateManyTenantInput = {
    id?: string
    name: string
    description?: string | null
    address: string
    city: string
    province: string
    zip_code: string
    latitude: Decimal | DecimalJsLike | number | string
    longitude: Decimal | DecimalJsLike | number | string
    main_image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    property_category: $Enums.PropertyCategory
  }

  export type propertiesUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    main_image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    property_category?: EnumPropertyCategoryFieldUpdateOperationsInput | $Enums.PropertyCategory
    bookings?: bookingsUpdateManyWithoutPropertyNestedInput
    peak_season_rates?: peak_season_ratesUpdateManyWithoutPropertyNestedInput
    property_images?: property_imagesUpdateManyWithoutPropertyNestedInput
    reviews?: reviewsUpdateManyWithoutPropertyNestedInput
    rooms?: roomsUpdateManyWithoutPropertyNestedInput
  }

  export type propertiesUncheckedUpdateWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    main_image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    property_category?: EnumPropertyCategoryFieldUpdateOperationsInput | $Enums.PropertyCategory
    bookings?: bookingsUncheckedUpdateManyWithoutPropertyNestedInput
    peak_season_rates?: peak_season_ratesUncheckedUpdateManyWithoutPropertyNestedInput
    property_images?: property_imagesUncheckedUpdateManyWithoutPropertyNestedInput
    reviews?: reviewsUncheckedUpdateManyWithoutPropertyNestedInput
    rooms?: roomsUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type propertiesUncheckedUpdateManyWithoutTenantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    province?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    latitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    longitude?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    main_image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    property_category?: EnumPropertyCategoryFieldUpdateOperationsInput | $Enums.PropertyCategory
  }

  export type bookingsCreateManyPropertyInput = {
    id?: string
    user_id: string
    status: $Enums.BookingStatus
    check_in_date: Date | string
    check_out_date: Date | string
    total_price: Decimal | DecimalJsLike | number | string
    payment_deadline?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    amount: Decimal | DecimalJsLike | number | string
    paid_at?: Date | string | null
    proof_image?: string | null
  }

  export type peak_season_ratesCreateManyPropertyInput = {
    id?: string
    room_id: string
    start_date: Date | string
    end_date: Date | string
    price_change_type: $Enums.PriceChangeType
    price_change_value: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type property_imagesCreateManyPropertyInput = {
    id?: string
    image_url: string
    created_at?: Date | string
  }

  export type reviewsCreateManyPropertyInput = {
    id?: string
    booking_id: string
    user_id: string
    comment?: string | null
    tenant_reply?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type roomsCreateManyPropertyInput = {
    id?: string
    name: string
    description?: string | null
    base_price: Decimal | DecimalJsLike | number | string
    capacity: number
    image?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    total_rooms: number
  }

  export type bookingsUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    check_in_date?: DateTimeFieldUpdateOperationsInput | Date | string
    check_out_date?: DateTimeFieldUpdateOperationsInput | Date | string
    total_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    proof_image?: NullableStringFieldUpdateOperationsInput | string | null
    booking_rooms?: booking_roomsUpdateManyWithoutBookingNestedInput
    user?: usersUpdateOneRequiredWithoutBookingsNestedInput
    reviews?: reviewsUpdateManyWithoutBookingNestedInput
  }

  export type bookingsUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    check_in_date?: DateTimeFieldUpdateOperationsInput | Date | string
    check_out_date?: DateTimeFieldUpdateOperationsInput | Date | string
    total_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    proof_image?: NullableStringFieldUpdateOperationsInput | string | null
    booking_rooms?: booking_roomsUncheckedUpdateManyWithoutBookingNestedInput
    reviews?: reviewsUncheckedUpdateManyWithoutBookingNestedInput
  }

  export type bookingsUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    status?: EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus
    check_in_date?: DateTimeFieldUpdateOperationsInput | Date | string
    check_out_date?: DateTimeFieldUpdateOperationsInput | Date | string
    total_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    payment_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paid_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    proof_image?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type peak_season_ratesUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    price_change_type?: EnumPriceChangeTypeFieldUpdateOperationsInput | $Enums.PriceChangeType
    price_change_value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: roomsUpdateOneRequiredWithoutPeak_season_ratesNestedInput
  }

  export type peak_season_ratesUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    price_change_type?: EnumPriceChangeTypeFieldUpdateOperationsInput | $Enums.PriceChangeType
    price_change_value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type peak_season_ratesUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    price_change_type?: EnumPriceChangeTypeFieldUpdateOperationsInput | $Enums.PriceChangeType
    price_change_value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type property_imagesUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type property_imagesUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type property_imagesUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type reviewsUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    tenant_reply?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: bookingsUpdateOneRequiredWithoutReviewsNestedInput
    user?: usersUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type reviewsUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    booking_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    tenant_reply?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type reviewsUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    booking_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    tenant_reply?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type roomsUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    base_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capacity?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_rooms?: IntFieldUpdateOperationsInput | number
    booking_rooms?: booking_roomsUpdateManyWithoutRoomNestedInput
    peak_season_rates?: peak_season_ratesUpdateManyWithoutRoomNestedInput
    room_availability?: room_availabilityUpdateManyWithoutRoomNestedInput
    room_images?: room_imagesUpdateManyWithoutRoomNestedInput
  }

  export type roomsUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    base_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capacity?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_rooms?: IntFieldUpdateOperationsInput | number
    booking_rooms?: booking_roomsUncheckedUpdateManyWithoutRoomNestedInput
    peak_season_rates?: peak_season_ratesUncheckedUpdateManyWithoutRoomNestedInput
    room_availability?: room_availabilityUncheckedUpdateManyWithoutRoomNestedInput
    room_images?: room_imagesUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type roomsUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    base_price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    capacity?: IntFieldUpdateOperationsInput | number
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    total_rooms?: IntFieldUpdateOperationsInput | number
  }

  export type booking_roomsCreateManyRoomInput = {
    id?: string
    booking_id: string
    guests_count: number
    price_per_night: Decimal | DecimalJsLike | number | string
    check_in_date: Date | string
    check_out_date: Date | string
    nights: number
    quantity: number
    subtotal: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type peak_season_ratesCreateManyRoomInput = {
    id?: string
    property_id: string
    start_date: Date | string
    end_date: Date | string
    price_change_type: $Enums.PriceChangeType
    price_change_value: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type room_availabilityCreateManyRoomInput = {
    id?: string
    date: Date | string
    is_available: boolean
    price_override?: Decimal | DecimalJsLike | number | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type room_imagesCreateManyRoomInput = {
    id?: string
    image_url: string
    created_at?: Date | string
  }

  export type booking_roomsUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    guests_count?: IntFieldUpdateOperationsInput | number
    price_per_night?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    check_in_date?: DateTimeFieldUpdateOperationsInput | Date | string
    check_out_date?: DateTimeFieldUpdateOperationsInput | Date | string
    nights?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    booking?: bookingsUpdateOneRequiredWithoutBooking_roomsNestedInput
  }

  export type booking_roomsUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    booking_id?: StringFieldUpdateOperationsInput | string
    guests_count?: IntFieldUpdateOperationsInput | number
    price_per_night?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    check_in_date?: DateTimeFieldUpdateOperationsInput | Date | string
    check_out_date?: DateTimeFieldUpdateOperationsInput | Date | string
    nights?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type booking_roomsUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    booking_id?: StringFieldUpdateOperationsInput | string
    guests_count?: IntFieldUpdateOperationsInput | number
    price_per_night?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    check_in_date?: DateTimeFieldUpdateOperationsInput | Date | string
    check_out_date?: DateTimeFieldUpdateOperationsInput | Date | string
    nights?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type peak_season_ratesUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    price_change_type?: EnumPriceChangeTypeFieldUpdateOperationsInput | $Enums.PriceChangeType
    price_change_value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: propertiesUpdateOneRequiredWithoutPeak_season_ratesNestedInput
  }

  export type peak_season_ratesUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    property_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    price_change_type?: EnumPriceChangeTypeFieldUpdateOperationsInput | $Enums.PriceChangeType
    price_change_value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type peak_season_ratesUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    property_id?: StringFieldUpdateOperationsInput | string
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    price_change_type?: EnumPriceChangeTypeFieldUpdateOperationsInput | $Enums.PriceChangeType
    price_change_value?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type room_availabilityUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    is_available?: BoolFieldUpdateOperationsInput | boolean
    price_override?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type room_availabilityUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    is_available?: BoolFieldUpdateOperationsInput | boolean
    price_override?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type room_availabilityUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    is_available?: BoolFieldUpdateOperationsInput | boolean
    price_override?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type room_imagesUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type room_imagesUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type room_imagesUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    image_url?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type booking_roomsCreateManyBookingInput = {
    id?: string
    room_id: string
    guests_count: number
    price_per_night: Decimal | DecimalJsLike | number | string
    check_in_date: Date | string
    check_out_date: Date | string
    nights: number
    quantity: number
    subtotal: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type reviewsCreateManyBookingInput = {
    id?: string
    user_id: string
    property_id: string
    comment?: string | null
    tenant_reply?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type booking_roomsUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    guests_count?: IntFieldUpdateOperationsInput | number
    price_per_night?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    check_in_date?: DateTimeFieldUpdateOperationsInput | Date | string
    check_out_date?: DateTimeFieldUpdateOperationsInput | Date | string
    nights?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: roomsUpdateOneRequiredWithoutBooking_roomsNestedInput
  }

  export type booking_roomsUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_id?: StringFieldUpdateOperationsInput | string
    guests_count?: IntFieldUpdateOperationsInput | number
    price_per_night?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    check_in_date?: DateTimeFieldUpdateOperationsInput | Date | string
    check_out_date?: DateTimeFieldUpdateOperationsInput | Date | string
    nights?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type booking_roomsUncheckedUpdateManyWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_id?: StringFieldUpdateOperationsInput | string
    guests_count?: IntFieldUpdateOperationsInput | number
    price_per_night?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    check_in_date?: DateTimeFieldUpdateOperationsInput | Date | string
    check_out_date?: DateTimeFieldUpdateOperationsInput | Date | string
    nights?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type reviewsUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    tenant_reply?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: propertiesUpdateOneRequiredWithoutReviewsNestedInput
    user?: usersUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type reviewsUncheckedUpdateWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    property_id?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    tenant_reply?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type reviewsUncheckedUpdateManyWithoutBookingInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    property_id?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    tenant_reply?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
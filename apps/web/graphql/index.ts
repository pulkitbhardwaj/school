import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	/** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
	DateTime: any;
};

export type ChangePasswordInput = {
	password: Scalars['String'];
	token: Scalars['String'];
};

export type DeleteUserInput = {
	id: Scalars['ID'];
};

export type Mutation = {
	__typename?: 'Mutation';
	changePassword: Scalars['Boolean'];
	deleteUser: Scalars['Boolean'];
	forgotPassword: Scalars['Boolean'];
	signinUser?: Maybe<User>;
	signupUser?: Maybe<User>;
	updateUser?: Maybe<User>;
};

export type MutationChangePasswordArgs = {
	options: ChangePasswordInput;
};

export type MutationDeleteUserArgs = {
	user: DeleteUserInput;
};

export type MutationForgotPasswordArgs = {
	email: Scalars['String'];
};

export type MutationSigninUserArgs = {
	user: SignInUserInput;
};

export type MutationSignupUserArgs = {
	user: SignUpUserInput;
};

export type MutationUpdateUserArgs = {
	user: UpdateUserInput;
};

export type Query = {
	__typename?: 'Query';
	allUsers?: Maybe<Array<User>>;
	me?: Maybe<User>;
	user?: Maybe<User>;
};

export type QueryUserArgs = {
	id: Scalars['Float'];
};

export type SignInUserInput = {
	email: Scalars['String'];
	password: Scalars['String'];
};

export type SignUpUserInput = {
	age?: Maybe<Scalars['Float']>;
	born?: Maybe<Scalars['DateTime']>;
	email: Scalars['String'];
	firstName: Scalars['String'];
	lastName: Scalars['String'];
	password: Scalars['String'];
	username: Scalars['String'];
};

export type UpdateUserInput = {
	age?: Maybe<Scalars['Float']>;
	born?: Maybe<Scalars['DateTime']>;
	email?: Maybe<Scalars['String']>;
	firstName?: Maybe<Scalars['String']>;
	id: Scalars['ID'];
	lastName?: Maybe<Scalars['String']>;
	username?: Maybe<Scalars['String']>;
};

export type User = {
	__typename?: 'User';
	age?: Maybe<Scalars['Float']>;
	born?: Maybe<Scalars['DateTime']>;
	createdAt: Scalars['DateTime'];
	email: Scalars['String'];
	firstName: Scalars['String'];
	id: Scalars['ID'];
	lastName: Scalars['String'];
	updatedAt: Scalars['DateTime'];
	username: Scalars['String'];
};

export type UserInfoFragment = { __typename?: 'User' } & Pick<
	User,
	| 'id'
	| 'firstName'
	| 'lastName'
	| 'email'
	| 'username'
	| 'age'
	| 'born'
	| 'updatedAt'
	| 'createdAt'
>;

export type AllUsersQueryVariables = Exact<{ [key: string]: never }>;

export type AllUsersQuery = { __typename?: 'Query' } & {
	allUsers?: Maybe<Array<{ __typename?: 'User' } & UserInfoFragment>>;
};

export const UserInfoFragmentDoc = gql`
	fragment UserInfo on User {
		id
		firstName
		lastName
		email
		username
		age
		born
		updatedAt
		createdAt
	}
`;
export const AllUsersDocument = gql`
	query AllUsers {
		allUsers {
			...UserInfo
		}
	}
	${UserInfoFragmentDoc}
`;

/**
 * __useAllUsersQuery__
 *
 * To run a query within a React component, call `useAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllUsersQuery(
	baseOptions?: Apollo.QueryHookOptions<AllUsersQuery, AllUsersQueryVariables>,
) {
	return Apollo.useQuery<AllUsersQuery, AllUsersQueryVariables>(
		AllUsersDocument,
		baseOptions,
	);
}
export function useAllUsersLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		AllUsersQuery,
		AllUsersQueryVariables
	>,
) {
	return Apollo.useLazyQuery<AllUsersQuery, AllUsersQueryVariables>(
		AllUsersDocument,
		baseOptions,
	);
}
export type AllUsersQueryHookResult = ReturnType<typeof useAllUsersQuery>;
export type AllUsersLazyQueryHookResult = ReturnType<
	typeof useAllUsersLazyQuery
>;
export type AllUsersQueryResult = Apollo.QueryResult<
	AllUsersQuery,
	AllUsersQueryVariables
>;

export interface IntrospectionResultData {
	__schema: {
		types: {
			kind: string;
			name: string;
			possibleTypes: {
				name: string;
			}[];
		}[];
	};
}
const result: IntrospectionResultData = {
	__schema: {
		types: [],
	},
};
export default result;

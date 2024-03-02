'use client';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useEffect } from 'react';
import { logout } from '@/lib/auth/logout';
import { Avatar } from './UI/avatar';
import { Text } from './UI/text';

import { useAppSelector } from '@/lib/store/hooks';

interface User {
    id: string;
    username: string;
    avatar: string;
    team: string;
    email: string;
}

interface NavigationItem {
    name: string;
    href: string;
    current: boolean;
}

const navigation: NavigationItem[] = [
    { name: 'Dashboard', href: '#', current: true },
];

export default function Navigation() {
    const selector = useAppSelector((state) => state.authReducer.data);

    const user: User = {
        id: selector.id,
        username: selector.username,
        avatar: selector.avatar,
        team: selector.team,
        email: selector.email,
    };

    function getInitials(username: string) {
        return username.substring(0, 2).toLowerCase();
    }

    const initials = getInitials(user.username);

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ');
    }

    // avatar navigation
    const userNavigation = [
        {
            name: 'Sign out',
            onClick: handleClick,
        },
    ];

    function handleClick() {
        // add remove auth state from redux store before logout
        logout();
    }

    useEffect(() => {});

    return (
        <div className="min-h-full">
            <div className="bg-gray-800 pb-32">
                <Disclosure as="nav" className="bg-gray-800">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                <div className="border-b border-gray-700">
                                    <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="h-8 w-8"
                                                    src="/group2.png"
                                                    width={500}
                                                    height={500}
                                                    alt="PL Blackjack Logo"
                                                />
                                            </div>
                                            <div className="hidden md:block">
                                                <div className="ml-10 flex items-baseline space-x-4">
                                                    {navigation.map((item) => (
                                                        <a
                                                            key={item.name}
                                                            href={item.href}
                                                            className={classNames(
                                                                item.current
                                                                    ? 'bg-gray-900 text-white'
                                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                                'rounded-md px-3 py-2 text-sm font-medium'
                                                            )}
                                                            aria-current={
                                                                item.current
                                                                    ? 'page'
                                                                    : undefined
                                                            }
                                                        >
                                                            {item.name}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="ml-4 flex items-center md:ml-6">
                                                <button
                                                    type="button"
                                                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                                >
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">
                                                        View notifications
                                                    </span>
                                                    <BellIcon
                                                        className="h-6 w-6"
                                                        aria-hidden="true"
                                                    />
                                                </button>

                                                {/* Profile dropdown */}
                                                <Menu
                                                    as="div"
                                                    className="relative ml-3"
                                                >
                                                    <div>
                                                        <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800">
                                                            <span className="absolute -inset-1.5" />
                                                            <span className="sr-only">
                                                                Open user menu
                                                            </span>
                                                            <Avatar
                                                                initials={
                                                                    initials
                                                                }
                                                                className="size-10 rounded-full bg-gray-900"
                                                                // src={
                                                                //     user.imageUrl
                                                                // }
                                                                alt=""
                                                            />
                                                        </Menu.Button>
                                                    </div>
                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                        <Menu.Items className="border border-gray-700 m-2 text-xs p-2 space-y-1 absolute flex flex-col items-start right-0 z-10 mt-2 w-56 origin-top-right rounded-md dark:bg-gray-800 dark:text-gray-300  py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                            <div className="border border-gray-700 m-2 text-xs w-48 rounded-xl p-2 space-y-1 dark:bg-gray-900">
                                                                <Text>
                                                                    {
                                                                        user.username
                                                                    }
                                                                </Text>
                                                                <div>
                                                                    {user.email}
                                                                </div>
                                                                <div>
                                                                    {user.team}
                                                                </div>

                                                                {/* <div>user.email</div> */}
                                                            </div>
                                                            {userNavigation.map(
                                                                (button) => (
                                                                    <Disclosure.Button
                                                                        key={
                                                                            button.name
                                                                        }
                                                                        onClick={
                                                                            button.onClick
                                                                        }
                                                                    >
                                                                        {({
                                                                            active,
                                                                        }) => (
                                                                            <a
                                                                                className={classNames(
                                                                                    active
                                                                                        ? 'dark:hover:bg-gray-700'
                                                                                        : '',
                                                                                    'block px-4 py-2 text-sm text-gray-700 dark:hover:text-white dark:text-gray-300 '
                                                                                )}
                                                                            >
                                                                                {
                                                                                    button.name
                                                                                }
                                                                            </a>
                                                                        )}
                                                                    </Disclosure.Button>
                                                                )
                                                            )}
                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>
                                            </div>
                                        </div>
                                        <div className="-mr-2 flex md:hidden">
                                            {/* Mobile menu button */}
                                            <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-0.5" />
                                                <span className="sr-only">
                                                    Open main menu
                                                </span>
                                                {open ? (
                                                    <XMarkIcon
                                                        className="block h-6 w-6"
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <Bars3Icon
                                                        className="block h-6 w-6"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                            </Disclosure.Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                                <div className="space-y-1 px-2 py-3 sm:px-3">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className={classNames(
                                                item.current
                                                    ? 'bg-gray-900 text-white'
                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'block rounded-md px-3 py-2 text-base font-medium'
                                            )}
                                            aria-current={
                                                item.current
                                                    ? 'page'
                                                    : undefined
                                            }
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                                <div className="border-t border-gray-700 pb-3 pt-4">
                                    <div className="flex items-center px-5">
                                        <div className="flex-shrink-0">
                                            <Avatar
                                                initials={initials}
                                                className="size-10 rounded-full bg-gray-900"
                                                // src={
                                                //     user.imageUrl
                                                // }
                                                alt=""
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium leading-none text-white">
                                                {user.username}
                                            </div>
                                            <div className="text-sm font-medium leading-none text-gray-400">
                                                {user.id}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">
                                                View notifications
                                            </span>
                                            <BellIcon
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                    <div className="mt-3 space-y-1 px-2">
                                        {userNavigation.map((item) => (
                                            <Disclosure.Button
                                                key={item.name}
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        ))}
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <header className="py-10">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex">
                            <h1 className="text-3xl font-bold tracking-tight text-white">
                                Your Dashboard
                            </h1>
                            <p className="px-3">🚀</p>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
}

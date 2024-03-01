import { Description, Field, FieldGroup, Fieldset } from './UI/fieldset';
import { Select } from './UI/select';
import PoolBanner from './PoolBanner';
import UserTable from './UserTable';
import users from '../test/testdata';
import { Avatar } from './UI/avatar';
import DenseTable from './DenseTable';
import { Strong, Text, TextLink } from './UI/text';
import { Badge } from './UI/badge';

export default function PoolFrame() {
    return (
        <div>
            <h1 className="text-2xl font-semibold">Pool Manager</h1>
            <Fieldset>
                <FieldGroup>
                    <Field>
                        <div className="flex items-center justify-between">
                            <Description className="w-1/2">
                                Select from all of the pools that you organize.
                            </Description>
                            <Select className="w-1/4" name="country">
                                <option>Canada</option>
                                <option>UK</option>
                            </Select>
                        </div>
                    </Field>
                </FieldGroup>
            </Fieldset>

            <div className="pt-5 w-full">
                <PoolBanner />
            </div>

            {/* player card component */}
            <div className="flex">
                <div className="w-1/2 mt-5 mr-5">
                    <div className="border border-gray-800 p-5 rounded-xl">
                        <div className="flex pb-5">
                            <div className="flex">
                                <Avatar initials={'TH'} className="size-12" />
                                <div className="flex w-auto">
                                    <div>
                                        <h2 className="text-xl pl-5 pt-1">
                                            The Hof
                                        </h2>
                                        <Text className="pl-5">Rank: 1</Text>
                                    </div>
                                    <div className="h-auto mt-1">
                                        <Badge color="lime" className="ml-5">
                                            ACTIVE
                                        </Badge>
                                        <Badge color="fuchsia" className="ml-2">
                                            PAID
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <DenseTable />

                        <div className="pt-10">
                            <h3>Player Details</h3>
                            <Text className="text-sm pt-2">
                                Email: michael.hofweller@gmail.com
                            </Text>
                            <Text className="">Club: Liverpool</Text>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 mt-5 ml-5">
                    <div className=" border border-gray-800 p-5 rounded-xl">
                        <div className="mb-3">
                            <p className="text-xl">All Players</p>
                            <Text className="mt-1">
                                Select a player for more details
                            </Text>
                        </div>
                        <UserTable users={users} />
                    </div>
                </div>
            </div>
        </div>
    );
}

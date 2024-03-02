import { Description, Field, FieldGroup, Fieldset } from './UI/fieldset';
import { Select } from './UI/select';
import PoolBanner from './PoolBanner';
import UserTable from './UserTable';
import users from '../test/testdata';
import { Text } from './UI/text';
import PlayerCard from './UserCard';

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

            <div className="flex">
                <div className="w-1/2 mt-5 mr-5">
                    <PlayerCard />
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

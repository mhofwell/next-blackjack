'use client';
import { Description, Field, FieldGroup, Fieldset } from './UI/fieldset';
import { Select } from './UI/select';
import { useAppDispatch } from '@/lib/store/hooks';
import { setActivePool } from '@/lib/store/slices/pool-slice';
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { OPTIONS_QUERY } from '@/lib/graphql/queries';
import { useEffect } from 'react';

type PoolOption = {
    id: string;
    name: string;
};

export default function PoolSelector({ id }: { id: string }) {
    const dispatch = useAppDispatch();

    const { data, loading, error } = useQuery(OPTIONS_QUERY, {
        variables: { input: id },
    });

    let disabled: boolean = false;

    if (error) {
        console.error(error);
        disabled = true;
    }

    const options: PoolOption[] = data?.options || [];

    useEffect(() => {
        dispatch(setActivePool(''));
    }, []);

    return (
        <Fieldset>
            <FieldGroup>
                <Field>
                    <div className="flex items-center justify-between">
                        <Description className="w-1/2">
                            Select from all of the pools that you organize.
                        </Description>

                        <Select
                            className="w-1/4"
                            name="pool"
                            onChange={(e) =>
                                dispatch(setActivePool(e.target.value))
                            }
                            defaultValue={
                                options ? 'Select a pool' : 'No pools available'
                            }
                            disabled={
                                !options || options.length === 0 || loading
                            }
                        >
                            <option value="Select a pool" disabled>
                                Select a pool
                            </option>
                            {options &&
                                options.map((option: PoolOption) => (
                                    <option value={option.id} key={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                        </Select>
                    </div>
                </Field>
            </FieldGroup>
        </Fieldset>
    );
}

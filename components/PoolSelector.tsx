'use client';
import { Description, Field, FieldGroup, Fieldset } from './UI/fieldset';
import { Select } from './UI/select';
import { useAppDispatch } from '@/lib/store/hooks';
import { setActivePool } from '@/lib/store/slices/pool-slice';
import { OPTIONS_QUERY } from '@/lib/graphql/queries';
import { useEffect } from 'react';
import { serverActionQuery } from '@/lib/actions/serverActionQuery';
import { ApolloError } from '@apollo/client';
import { useState } from 'react';

type PoolOption = {
    id: string;
    name: string;
};

async function fetchData(
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<ApolloError | null>>,
    setOptions: React.Dispatch<React.SetStateAction<PoolOption[] | null>>,
    id: string
) {
    setError(null);
    setLoading(true);

    const variables = {
        input: id,
    };

    const { data, error } = await serverActionQuery(OPTIONS_QUERY, variables);

    if (data) {
        setOptions(data.options);
    }

    if (error) {
        setError(error);
    }
    setLoading(false);
}

export default function PoolSelector({ id }: { id: string }) {
    const dispatch = useAppDispatch();
    const [error, setError] = useState<ApolloError | null>(null);
    const [options, setOptions] = useState<PoolOption[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    let disabled: boolean = false;

    if (error) {
        console.error(error);
        disabled = true;
    }

    useEffect(() => {
        dispatch(setActivePool(''));
        fetchData(setLoading, setError, setOptions, id);
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
                            defaultValue={'Select a pool'}
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

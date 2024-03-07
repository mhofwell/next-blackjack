'use client';

import { Description, Field, FieldGroup, Fieldset } from './UI/fieldset';
import { Select } from './UI/select';
import { useAppDispatch } from '@/lib/store/hooks';
import { setActivePool } from '@/lib/store/slices/pool-slice';

export default function PoolSelector({ options }: { options: any }) {
    // save pools to state
    const dispatch = useAppDispatch();

    async function handlePoolSelect(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        // set state with the id of the selected pool
        const payload: string = event.target.value;
        dispatch(setActivePool(payload));
    }

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
                            onChange={handlePoolSelect}
                            defaultValue="Select a pool"
                        >
                            <option value="Select a pool" disabled>
                                Select a pool
                            </option>
                            {options.map((option) => (
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

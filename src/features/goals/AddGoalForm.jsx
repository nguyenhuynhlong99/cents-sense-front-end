import FormRow from '../../ui/FormRow';
import Icon from '../../ui/Icon';
import Input from '../../ui/Input';
import ModalButton from '../../ui/ModalButton';
import { listOfIcons } from '../../utils/helpers';

function AddGoalForm({ setIsShown }) {
  return (
    <form className="text-base">
      <div className="divide-y divide-neutral-700">
        <FormRow label="Name">
          <Input autoFocus type="text" id="name" />
        </FormRow>

        <FormRow label="Starting amount">
          <Input type="number" id="startingAmount" />
        </FormRow>

        <FormRow label="Target amount">
          <Input type="number" id="targetAmount" />
        </FormRow>

        <FormRow>
          <span className="font-semibold text-sm sm:text-base">Icon</span>
          <ul className="flex flex-wrap gap-2">
            {listOfIcons.map((name) => (
              <li key={name}>
                <input
                  //   {...register('icon', {
                  //     required: 'This field is required',
                  //   })}
                  //   disabled={isCreating || isUpdating}
                  type="radio"
                  value={name}
                  name="icon"
                  id={name}
                  className="sr-only peer"
                />
                <label
                  htmlFor={name}
                  className="flex items-center justify-center p-3 border-2 border-neutral-500 rounded-full peer-checked:border-green-500 peer-checked:bg-green-600 cursor-pointer"
                >
                  <Icon name={name} color="rgb(240 253 244)" />
                </label>
              </li>
            ))}
          </ul>
        </FormRow>
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <ModalButton
          onClick={() => setIsShown(false)}
          //   disabled={isCreating || isUpdating}
          type="reset"
          variations="secondary"
        >
          Cancel
        </ModalButton>
        <ModalButton
          // disabled={isCreating || isUpdating}
          type="submit"
        >
          Save
        </ModalButton>
      </div>
    </form>
  );
}

export default AddGoalForm;

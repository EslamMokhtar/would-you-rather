import * as React from "react";
import { questionActions } from "../store/question-slice";
import { userActions } from "../store/user-slice";
import { _saveQuestionAnswer } from "../_DATA";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const UnansweredCard = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch();
  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (value.length > 1) {
      setLoading(true);
      await _saveQuestionAnswer({
        authedUser: props.authUser,
        qid: props.questionId,
        answer: value,
      });
      dispatch(
        questionActions.answerQuestion({
          id: props.questionId,
          answer: value,
          user: props.authUser,
        })
      );
      setLoading(false);
      props.submitUrl();
      return dispatch(
        userActions.answerQuestion({
          id: props.questionId,
          answer: value,
          user: props.authUser,
        })
      );
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{ m: 3,mt:5 }} component="fieldset" variant="standard">
        <Stack spacing={2}>
          <FormLabel component="legend">Would You Rather...</FormLabel>
          <RadioGroup
            aria-label="quiz"
            name="quiz"
            value={value}
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value="optionOne"
              control={<Radio />}
              label={props.questions[props.questionId].optionOne.text}
            />

            <FormControlLabel
              value="optionTwo"
              control={<Radio />}
              label={props.questions[props.questionId].optionTwo.text}
            />
          </RadioGroup>

        </Stack>
          <LoadingButton
            sx={{ mt: 3, mr: 1, borderRadius: 25 }}
            type="submit"
            variant="outlined"
            loading={loading}
          >
            Submit
          </LoadingButton>
      </FormControl>
    </form>
  );
};

export default UnansweredCard;

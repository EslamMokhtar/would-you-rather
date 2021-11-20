import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import ListCard from "../cards/ListCard";
import { Button, Typography } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Home = (props) => {
  const authUser = useSelector((state) => state.auth.authUser);

  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const [value, setValue] = React.useState(0);
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    if (!tab) {
      return setSearchParams({ tab: 1 });
    }
    setValue(+tab);
  }, [setSearchParams, tab]);
  const handleChange = (event, newValue) => {
    setSearchParams({ tab: newValue });
    setValue(newValue);
  };

  const answeredQuestions = Object.keys(props.questions)
    .sort((a, b) => props.questions[b].timestamp - props.questions[a].timestamp)
    .filter((key) => props.users[authUser].answers[key]);

  const unansweredQuestions = Object.keys(props.questions)
    .sort((a, b) => props.questions[b].timestamp - props.questions[a].timestamp)
    .filter((key) => !props.users[authUser].answers[key]);

  React.useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset);
    };
  }, []);

  return (
    <>
      <Box sx={{ width: "100%", position: "relative" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          {offset > 0 && (
            <Button
              sx={{
                position: "fixed",
                bottom: 50,
                right: 50,
                borderRadius: 25,
              }}
              size="large"
              variant="contained"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                })
              }
            >
              <ArrowDropUpIcon />
            </Button>
          )}
          <Tabs
            sx={{
              textAlign: "center",
            }}
            value={value}
            onChange={handleChange}
            centered
          >
            <Tab
              iconPosition="end"
              icon={
                <Badge
                  badgeContent={answeredQuestions.length}
                  color="success"
                />
              }
              label={`Answered Questions \xa0`}
              {...a11yProps(0)}
            />
            <Tab
              iconPosition="end"
              icon={
                <Badge
                  badgeContent={unansweredQuestions.length}
                  color="error"
                />
              }
              label={`Unanswered Questions \xa0`}
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        {answeredQuestions.length === 0 && (
          <Typography variant="h4" sx={{ mt: 5 }}>
            No more questions!
          </Typography>
        )}
        {props.users[authUser] ? (
          <TabPanel value={value} index={0}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              {answeredQuestions.map((key) => (
                <ListCard
                  key={key}
                  id={key}
                  users={props.users}
                  questions={props.questions}
                />
              ))}
            </Grid>
          </TabPanel>
        ) : (
          <CircularProgress sx={{ mt: 20 }} />
        )}
        <TabPanel value={value} index={1}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            {unansweredQuestions.length === 0 && (
              <Typography variant="h4" sx={{ mt: 5 }}>
                No more questions!
              </Typography>
            )}
            {unansweredQuestions.map((key) => (
              <ListCard
                key={key}
                id={key}
                users={props.users}
                questions={props.questions}
              />
            ))}
          </Grid>
        </TabPanel>
      </Box>
    </>
  );
};

export default Home;

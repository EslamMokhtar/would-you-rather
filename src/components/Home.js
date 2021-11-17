import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";
import { useSearchParams, Link } from "react-router-dom";
import Badge from "@mui/material/Badge";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const [value, setValue] = React.useState(+tab || 0);

  React.useEffect(() => {
    if (!tab) {
      setSearchParams({ tab: 0 });
    }
  }, [setSearchParams, tab]);
  const handleChange = (event, newValue) => {
    setSearchParams({ tab: newValue });
    setValue(newValue);
  };

  const answeredQuestions = Object.keys(props.questions).filter(
    (key) => props.users[props.authUser].answers[key]
  );
  const unansweredQuestions = Object.keys(props.questions).filter(
    (key) => !props.users[props.authUser].answers[key]
  );
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          sx={{ textAlign: "center" }}
          value={value}
          onChange={handleChange}
          centered
        >
          <Tab
            iconPosition="end"
            icon={
              <Badge badgeContent={answeredQuestions.length} color="success" />
            }
            label={`Answered Questions \xa0`}
            {...a11yProps(0)}
          />
          <Tab
            iconPosition="end"
            icon={
              <Badge badgeContent={unansweredQuestions.length} color="error" />
            }
            label={`Unanswered Questions \xa0`}
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      {props.users[props.authUser] ? (
        <TabPanel value={value} index={0}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            {answeredQuestions.map((key) => (
              <Grid item key={key}>
                <Card
                  sx={{
                    width: 450,
                    maxHeight: 200,
                    mb: 5,
                  }}
                >
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography
                      component="div"
                      variant="h6"
                      sx={{ textAlign: "left" }}
                    >
                      {props.users[props.questions[key].author].name} asks:
                    </Typography>
                    <Divider variant="middle" />
                    <Stack spacing={1} direction="row">
                      <CardMedia
                        component="img"
                        sx={{ width: 150 }}
                        image={
                          props.users[props.questions[key].author].avatarURL
                        }
                        alt="User image"
                      />
                      <div />
                      <div />
                      <div />
                      <Stack spacing={2}>
                        <Typography
                          component="div"
                          variant="body1"
                          sx={{ mt: 2 }}
                        >
                          Would You Rather
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          component="div"
                        >
                          _{props.questions[key].optionOne.text}_
                        </Typography>

                        <Button
                          variant="outlined"
                          sx={{ width: 200 }}
                          component={Link}
                          to={`/questions/${key}`}
                        >
                          View Poll
                        </Button>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
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
          {unansweredQuestions.map((key) => (
            <Grid item key={key}>
              <Card
                sx={{
                  display: "flex",
                  width: 450,
                  maxHeight: 200,
                  mb: 5,
                }}
              >
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography
                    component="div"
                    variant="h6"
                    sx={{ textAlign: "left" }}
                  >
                    {props.users[props.questions[key].author].name} asks:
                  </Typography>
                  <Divider variant="middle" />
                  <Stack spacing={1} direction="row">
                    <CardMedia
                      component="img"
                      sx={{ width: 150 }}
                      image={props.users[props.questions[key].author].avatarURL}
                      alt="User image"
                    />
                    <div />
                    <div />
                    <div />
                    <Stack spacing={2}>
                      <Typography
                        component="div"
                        variant="body1"
                        sx={{ mt: 2 }}
                      >
                        Would You Rather
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        component="div"
                      >
                        _{props.questions[key].optionOne.text}_
                      </Typography>

                      <Button
                        variant="outlined"
                        sx={{ width: 200 }}
                        component={Link}
                        to={`/questions/${key}`}
                      >
                        View Poll
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default Home;

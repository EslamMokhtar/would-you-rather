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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          sx={{ textAlign: "center" }}
          value={value}
          onChange={handleChange}
          centered
        >
          <Tab label="Answered Questions" {...a11yProps(0)} />
          <Tab label="UnAnswered Questions" {...a11yProps(1)} />
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
            {Object.keys(props.questions)
              .filter(
                (key) =>
                  props.questions[key].optionOne.votes.includes(
                    props.authUser
                  ) ||
                  props.questions[key].optionTwo.votes.includes(props.authUser)
              )
              .map((key) => (
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

                        <Stack spacing={2}>
                          <Typography
                            component="div"
                            variant="body1"
                            sx={{ mt: 2 }}
                          >
                            Would You Rather
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            _{props.questions[key].optionOne.text}_
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              pl: 1,
                              pb: 1,
                            }}
                          >
                            <Button fullWidth>View Poll</Button>
                          </Box>
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
          {Object.keys(props.questions)
            .filter(
              (key) =>
                !props.questions[key].optionOne.votes.includes(
                  props.authUser
                ) &&
                !props.questions[key].optionTwo.votes.includes(props.authUser)
            )
            .map((key) => (
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
                        image={
                          props.users[props.questions[key].author].avatarURL
                        }
                        alt="User image"
                      />

                      <Stack spacing={2}>
                        <Typography
                          component="div"
                          variant="body1"
                          sx={{ mt: 2 }}
                        >
                          Would You Rather
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          _{props.questions[key].optionOne.text}_
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            pl: 1,
                            pb: 1,
                          }}
                        >
                          <Button fullWidth>View Poll</Button>
                        </Box>
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

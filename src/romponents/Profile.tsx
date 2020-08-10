import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import ProfileCard from './ProfileCard';
import Header from './Header';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import image from '../images/dummy.png';
import GitHubIcon from '@material-ui/icons/GitHub';
import axios from '../config/axios.config';

type State = {
  name: string;
  email: string;
  aboutMe: string;
  github: string;
  institution: string;
  profileImage: string;
  subMission: {
    subMissionFrequency: [
      {
        key: string;
        value: string;
      }
    ];
    lastSubmissions: [
      {
        name: string;
      }
    ];
  };
};

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    aboutMe: '',
    github: '',
    institution: '',
    profileImage: '',
    subMission: {
      subMissionFrequency: [
        {
          key: '',
          value: '',
        },
      ],
      lastSubmissions: [
        {
          name: '',
        },
      ],
    },
  });
  let token: string = localStorage.getItem('Token') || '';
  let userData: State | null = null;
  const fetchDetails = async () => {
    if (token !== '') {
      const res = await axios.get(`/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = res;
      if (data !== {}) {
        userData = {
          name: data.data.userData.name,
          email: data.data.userData.email,
          aboutMe: data.data.userData.aboutMe,
          github: data.data.userData.github,
          institution: data.data.userData.institution,
          profileImage: data.data.userData.profileImage,
          subMission: {
            subMissionFrequency:
              data.data.userData.subMission.subMissionFrequency,
            lastSubmissions: data.data.userData.subMission.lastSubmissions,
          },
        };
        setProfileData(userData);
      }
    }
  };
  console.log(profileData.profileImage);
  useEffect(() => {
    fetchDetails();
  }, []);
  return (
    <div>
      <Header />
      {profileData ? (
        <Grid container>
          <Grid item md={4}>
            <div style={{ padding: '20px' }}>
              {profileData.profileImage ? (
                <img
                  src={profileData.profileImage}
                  alt="profile"
                  style={{ width: '250px', borderRadius: '10px' }}
                />
              ) : (
                <img
                  src={image}
                  alt="profile"
                  style={{ borderRadius: '100%' }}
                />
              )}
            </div>
            <div style={{ padding: '20px' }}>
              <Typography
                variant="body1"
                style={{ fontWeight: 'bold', fontSize: '35px' }}
              >
                {profileData.name}
              </Typography>
              <hr />
              <Typography
                variant="body1"
                style={{ fontWeight: 'bold', fontSize: '30px' }}
              >
                About:
              </Typography>

              <Typography variant="h6" style={{ padding: '2px' }}>
                {profileData.aboutMe}
              </Typography>

              <Typography variant="body1">
                <a
                  href={`https://github.com/${profileData.github}`}
                  style={{ textDecoration: 'none', color: '#000' }}
                >
                  <GitHubIcon />
                </a>
              </Typography>
              <Typography variant="body1">{profileData.institution}</Typography>
            </div>
          </Grid>
          <Grid item md={8}>
            <Typography component="div" style={{ paddingTop: '20px' }}>
              <ProfileCard
                frequency={profileData.subMission.subMissionFrequency}
              />
            </Typography>
            <Typography component="div" style={{ paddingTop: '20px' }}>
              <Card>
                <CardContent>
                  <Typography
                    component="h2"
                    gutterBottom
                    style={{ fontWeight: 'bold', fontSize: '30px' }}
                  >
                    Recent Activity
                  </Typography>
                </CardContent>
                {profileData
                  ? profileData.subMission.lastSubmissions.map((item) => {
                      return (
                        <CardActions>
                          <Typography
                            variant="h6"
                            gutterBottom
                            style={{ padding: '10px' }}
                          >
                            {item.name}
                          </Typography>
                        </CardActions>
                      );
                    })
                  : null}
              </Card>
            </Typography>
          </Grid>
        </Grid>
      ) : null}
    </div>
  );
};
export default Profile;

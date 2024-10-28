import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axiosClient from '../../Helpers/axios-client';

const AnalyticsAndReports = ({ userId }) => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [highScoreData, setHighScoreData] = useState([]);
  const [gameCompleters, setGameCompleters] = useState(0);
  const [achievers, setAchievers] = useState(0);

  // Fetch total users
  const fetchTotalUsers = async () => {
    try {
      const response = await axiosClient.get('/admin/fetchUsers');
      setTotalUsers(response.data.length);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Fetch aggregated high scores
  const fetchHighScoreData = async () => {
    try {
      const response = await axiosClient.get('/admin/fetchAllHighScores');
      console.log('Fetched high score data:', response.data);

      if (response.data) {
        setHighScoreData([
          { gameMode: 'Shapes', score: response.data.shapes },
          { gameMode: 'Letters', score: response.data.letters },
          { gameMode: 'Numbers', score: response.data.numbers }
        ]);

        console.log(response.data);
      }
    } catch (error) {
      console.error('Error fetching high score data:', error);
    }
  };

  useEffect(() => {
    fetchTotalUsers();
    fetchHighScoreData();
  }, []);

  return (
    <Box sx={{ p: 3, fontFamily: 'Poppins, sans-serif' }}>
      <Box sx={{ display: 'flex', mb: 3 }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: 40, fontFamily: 'Poppins, sans-serif' }}>
          ANALYTICS AND REPORTS
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', padding: 2, backgroundColor: '#ec7063', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <PeopleIcon sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{totalUsers}</Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Poppins, sans-serif' }}>Total Users</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', padding: 2, backgroundColor: '#f7dc6f', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <SportsEsportsIcon sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{gameCompleters}</Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Poppins, sans-serif' }}>Game Completers</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', padding: 2, backgroundColor: '#58d68d', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <EmojiEventsIcon sx={{ fontSize: 40 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{achievers}</Typography>
              <Typography variant="body1" sx={{ fontFamily: 'Poppins, sans-serif' }}>Achievers</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', mb: 2 }}>
          Total Combined High Scores
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={highScoreData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="gameMode" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" fill="#8884d8" name="High Score" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default AnalyticsAndReports;

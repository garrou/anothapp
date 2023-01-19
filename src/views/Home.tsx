import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import GitHubIcon from '@mui/icons-material/GitHub';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Avatar, CardMedia, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const server: string | undefined = process.env.REACT_APP_SERVER;
    const navigate = useNavigate();
    const [shows, setShows] = useState([]);

    useEffect(() => {
        (async () => {
            const resp: Response = await fetch(`${server}/intro/images`);
            const data: any = await resp.json();
            setShows(data);
        })();
    }, []);

    const onClick = async () => {
        window.open(`${server}/auth/google`, '_self');
    }

    return (
        <>
            <CssBaseline />
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Anothapp
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Un site permettant de gérer vos séries, vos saisons et vos épisodes.
                        </Typography>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button color="inherit" variant="contained" onClick={onClick} startIcon={<Avatar src={'img/google.png'} />}>
                                Se connecter avec Google
                            </Button>
                        </Stack>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                        {shows.map(s => (
                            <Grid item key={s['showId']} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            pt: '56.25%',
                                        }}
                                        image={s['poster']}
                                        alt="Poster"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2" align="center">
                                            {s['title']}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>

            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Button color="inherit" variant="outlined" href="https://github.com/garrou/anothapp" startIcon={<GitHubIcon />}>Github</Button>
            </Box>
        </>
    );
};
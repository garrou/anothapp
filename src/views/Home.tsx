import { Avatar, Box, CssBaseline, Grid, Paper, Typography } from "@mui/material"
import Button from "@mui/material/Button";

export default function Home() {

    const handleSubmit = () => {

    }

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(logo.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 5,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar 
                        sx={{ m: 1, width: 250, height: 250, display: { sm: 'none' } }} 
                        src="logo.png" />
                    <Typography component="h1" variant="h5">
                        A N O T H A P P
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <Button
                            color="inherit"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3 }}
                            startIcon={<Avatar src={'google.png'} />}
                        >
                            Se connecter avec Google
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
};
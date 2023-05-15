import { Box } from '@mui/material'
import { lazy } from 'react'
const Lottie = lazy(() => import('react-lottie-player'))

interface LoadingLottieProps {
    data: object | undefined
}

export default function LoadingLottie({ data }: LoadingLottieProps) {
    return (
        <Box sx={{
            postion: 'relative',
            display: 'flex',
            height: 'fit-content',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexGrow: 1
        }}>
            <Box sx={{
                postion: 'absolute'
            }}>
                <Lottie
                    loop
                    animationData={data}
                    play
                    style={{ width: 720, height: 720 }}
                />
            </Box>
        </Box>)
}
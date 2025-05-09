import { Card, CardActionArea, CardContent, Typography } from "@mui/material"

export const CardDate = ({ index, date, handleOnSelectDate, selectedDate }) => {
  return (
    <Card key={index} sx={{ minWidth: 80, maxWidth: 100, flexShrink: 0 }}>
    <CardActionArea
      onClick={() => handleOnSelectDate(date)}
      data-active={selectedDate === date ? '' : undefined}
      sx={{
        height: '100%',
        '&[data-active]': {
          backgroundColor: '#1976d2',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#1565c0',
          },
        },
      }}
    >
      <CardContent sx={{ py: 1, px: 1 }}>
        <Typography variant="body1" align="center">
          {date.day}
        </Typography>
        <Typography variant="caption" align="center">
          {date.dayNumber}
        </Typography>
        <Typography variant="body2" align="center">
          {date.month}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
  )
}

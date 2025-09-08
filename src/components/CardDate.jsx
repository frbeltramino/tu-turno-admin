import { Card, CardActionArea, CardContent, Typography } from "@mui/material"
import { getI18nDay, getI18nMonth } from "../utils/commonUtilities";

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
          {getI18nDay(date.date)}
        </Typography>
        <Typography variant="caption" align="center">
          {date.dayNumber}
        </Typography>
        <Typography variant="body2" align="center">
          {getI18nMonth(date.date)}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
  )
}

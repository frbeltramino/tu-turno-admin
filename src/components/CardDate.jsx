import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { getI18nDay, getI18nMonth } from "../utils/commonUtilities";

export const CardDate = ({ index, date, handleOnSelectDate, selectedDate }) => {
  return (
    <Card
      key={index}
      sx={{
        minWidth: { xs: 60, sm: 80 },   // más pequeño en mobile
        maxWidth: { xs: 80, sm: 100 },
        flexShrink: 0,
      }}
    >
      <CardActionArea
        onClick={() => handleOnSelectDate(date)}
        data-active={selectedDate === date ? "" : undefined}
        sx={{
          height: "100%",
          "&[data-active]": {
            backgroundColor: "#1976d2",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          },
        }}
      >
        <CardContent
          sx={{
            py: { xs: 0.5, sm: 1 },  // padding vertical más pequeño en mobile
            px: { xs: 0.5, sm: 1 },  // padding horizontal más pequeño en mobile
          }}
        >
          <Typography
            variant="body1"
            align="center"
            sx={{ fontSize: { xs: "0.7rem", sm: "0.9rem" } }}
          >
            {getI18nDay(date.date)}
          </Typography>

          <Typography
            variant="caption"
            align="center"
            sx={{ fontSize: { xs: "0.6rem", sm: "0.8rem" }, fontWeight: "bold" }}
          >
            {date.dayNumber}
          </Typography>

          <Typography
            variant="body2"
            align="center"
            sx={{ fontSize: { xs: "0.6rem", sm: "0.8rem" } }}
          >
            {getI18nMonth(date.date)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
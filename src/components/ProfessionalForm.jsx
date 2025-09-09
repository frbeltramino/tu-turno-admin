import { useState } from "react"
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Alert,
  Chip,
  Stack,
  CircularProgress,
  useMediaQuery,
  useTheme
} from "@mui/material"
import { Person, Schedule, FactCheck, CheckCircle, Start, Error } from "@mui/icons-material"
import { useTranslation } from "react-i18next";
import { SuccessScreen } from "./SuccessScreen";
import { ConfirmationProfessionalData } from "./ConfirmationProfessionalData";
import { useServicesAndProfessionals } from "../hooks/useServicesAndProfessionals";
import { ErrorScreen } from "./ErrorScreen";


export const ProfessionalRegistrationForm = ({ onClose }) => {
  const { t } = useTranslation();
  const { createProfessional, successCreateProfessional, createProfessionalLoading, errorCreateProfessional, createResult } = useServicesAndProfessionals();
  const steps = [
    {
      label: t("i18n.professionals.010"),
      icon: <Person />,
    },
    {
      label: t("i18n.professionals.011"),
      icon: <Schedule />,
    },
    {
      label: t("i18n.common.010"),
      icon: <FactCheck />
    }, // Confirmación
    {
      label: createResult == "ok" ? t("i18n.professionals.033") : t("i18n.professionals.059"),
      icon: createResult == "ok" ? <CheckCircle /> : <Error />
    },   // Success - Error
  ]

  const daysOfWeek = [
    { value: "Monday", label: t("i18n.days.monday"), dayIndex: 1 },
    { value: "Tuesday", label: t("i18n.days.tuesday"), dayIndex: 2 },
    { value: "Wednesday", label: t("i18n.days.wednesday"), dayIndex: 3 },
    { value: "Thursday", label: t("i18n.days.thursday"), dayIndex: 4 },
    { value: "Friday", label: t("i18n.days.friday"), dayIndex: 5 },
    { value: "Saturday", label: t("i18n.days.saturday"), dayIndex: 6 },
    { value: "Sunday", label: t("i18n.days.sunday"), dayIndex: 7 },
  ]


  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    // Step 1: Datos Personales
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    descripcion: "",

    // Step 2: Horarios de Trabajo
    selectedDay: "",
    startHourAM: "",
    endHourAM: "",
    startHourPM: "",
    endHourPM: "",
    horarios: [],
  })

  const [errors, setErrors] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const handleDayToggle = (day) => {
    setFormData((prev) => ({
      ...prev,
      diasTrabajo: prev.diasTrabajo.includes(day)
        ? prev.diasTrabajo.filter((d) => d !== day)
        : [...prev.diasTrabajo, day],
    }))
  }

  const validateStep = (step) => {
    const newErrors = {}

    switch (step) {
      case 0:
        if (!formData.nombre.trim()) newErrors.nombre = t('i18n.professionals.019')
        if (!formData.apellido.trim()) newErrors.apellido = t('i18n.professionals.020')
        if (!formData.email.trim()) {
          newErrors.email = t('i18n.professionals.021')
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = t('i18n.professionals.023')
        }
        if (!formData.telefono.trim()) newErrors.telefono = t('i18n.professionals.022')
        if (!formData.descripcion.trim()) newErrors.descripcion = t('i18n.professionals.058')
        break

      case 1:
        const horarios = formData.horarios || [];

        if (horarios.length === 0) {
          newErrors.horarios = t('i18n.professionals.042');
        }

        break;


    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateDay = () => {
    let validForm = true;
    if (!formData.selectedDay) {
      setErrors((prev) => ({
        ...prev,
        selectedDay: t('i18n.professionals.043'),
      }));
      validForm = false;
    }
    if (!formData.startHourAM) {
      setErrors((prev) => ({
        ...prev,
        startHourAM: t('i18n.professionals.044'),
      }));
      validForm = false;
    }
    if (!formData.endHourAM) {
      setErrors((prev) => ({
        ...prev,
        endHourAM: t('i18n.professionals.045'),
      }));
      validForm = false;
    }
    if (!formData.startHourPM) {
      setErrors((prev) => ({
        ...prev,
        startHourPM: t('i18n.professionals.046'),
      }));
      validForm = false;
    }
    if (!formData.endHourPM) {
      setErrors((prev) => ({
        ...prev,
        endHourPM: t('i18n.professionals.047'),
      }));
      validForm = false;
    }
    // Validar duplicados de días
    const dias = formData.horarios.map((h) => h.dia);
    const duplicados = dias.filter((d, i) => dias.indexOf(d) !== i);
    if (duplicados.length > 0) {
      setErrors((prev) => ({
        ...prev,
        repeatDays: t('i18n.professionals.048'),
      }));
      validForm = false;
    }
    return validForm;
  }

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prev) => prev - 1)
  }

  const handleSubmit = async () => {
    if (validateStep(activeStep)) {
      console.log("Datos del profesional:", formData);

      await createProfessional(formData);

      setActiveStep((prev) => prev + 1);

    }
  };

  const renderStepContent = (step) => {
    let professionalData = [];
    switch (step) {
      case 0:
        return (
          <Grid
            container
            spacing={3}
            sx={{ justifyContent: "left", alignItems: "flex-start", width: "100%" }}
          >
            <Grid item sm={6} sx={{
              width: {
                xs: "100%"
              }
            }}>
              <TextField
                fullWidth
                variant="outlined"
                label={t("i18n.professionals.013")}
                value={formData.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
                error={!!errors.nombre}
                helperText={errors.nombre}
              />
            </Grid>

            <Grid item sm={6} sx={{
              width: {
                xs: "100%"
              }
            }}>
              <TextField
                fullWidth
                variant="outlined"
                label={t("i18n.professionals.014")}
                value={formData.apellido}
                onChange={(e) => handleInputChange("apellido", e.target.value)}
                error={!!errors.apellido}
                helperText={errors.apellido}
              />
            </Grid>

            <Grid item sm={6} sx={{
              width: {
                xs: "100%"
              }
            }}>
              <TextField
                fullWidth
                variant="outlined"
                type="email"
                label={t("i18n.professionals.015")}
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>

            <Grid item sm={6} sx={{
              width: {
                xs: "100%"
              }
            }}>
              <TextField
                fullWidth
                variant="outlined"
                label={t("i18n.professionals.016")}
                value={formData.telefono}
                onChange={(e) => handleInputChange("telefono", e.target.value)}
                error={!!errors.telefono}
                helperText={errors.telefono}
              />
            </Grid>

            <Grid item sm={6} sx={{
              width: {
                xs: "100%"
              }
            }}>
              <TextField
                fullWidth
                variant="outlined"
                multiline
                label={t("i18n.professionals.057")}
                value={formData.descripcion}
                onChange={(e) => handleInputChange("descripcion", e.target.value)}
                error={!!errors.descripcion}
                helperText={errors.descripcion}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="flex-start"
          >
            {/* Columna izquierda */}
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: "grey.50" }}>
                <Typography variant="h6" gutterBottom align="center">
                  {t('i18n.professionals.049')}
                </Typography>

                {/* Selección de día */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel
                    id="dia-label"
                  >{t("i18n.appointments.019")}</InputLabel>
                  <Select
                    labelId="dia-label"
                    value={formData.selectedDay?.value || ""}
                    onChange={(e) => {
                      const selected = daysOfWeek.find(day => day.value === e.target.value);
                      handleInputChange("selectedDay", selected);
                    }}
                    label={t("i18n.appointments.019")}
                    error={!!errors.selectedDay}
                  >
                    {daysOfWeek.map((day) => (
                      <MenuItem key={day.value} value={day.value}>
                        {day.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Horario Mañana */}
                <Typography variant="subtitle1" sx={{ mt: 2 }}>{t("i18n.professionals.050")}</Typography>
                <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                  <Grid item xs={6} >
                    <TextField
                      fullWidth
                      label={t("i18n.professionals.051")}
                      type="time"
                      value={formData.startHourAM || ""}
                      onChange={(e) => handleInputChange("startHourAM", e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.startHourAM}
                      helperText={errors.startHourAM}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label={t("i18n.professionals.052")}
                      type="time"
                      value={formData.endHourAM || ""}
                      onChange={(e) => handleInputChange("endHourAM", e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.endHourAM}
                      helperText={errors.endHourAM}
                    />
                  </Grid>
                </Grid>

                {/* Horario Tarde */}
                <Typography variant="subtitle1">{t("i18n.professionals.053")}</Typography>
                <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label={t("i18n.professionals.051")}
                      type="time"
                      value={formData.startHourPM || ""}
                      onChange={(e) => handleInputChange("startHourPM", e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.startHourPM}
                      helperText={errors.startHourPM}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label={t("i18n.professionals.052")}
                      type="time"
                      value={formData.endHourPM || ""}
                      onChange={(e) => handleInputChange("endHourPM", e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.endHourPM}
                      helperText={errors.endHourPM}
                    />
                  </Grid>
                </Grid>

                {/* Botón para agregar */}
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {

                    if (validateDay()) {
                      const newHorario = {
                        dia: formData.selectedDay,
                        manana: {
                          inicio: formData.startHourAM,
                          fin: formData.endHourAM,
                        },
                        tarde: {
                          inicio: formData.startHourPM,
                          fin: formData.endHourPM,
                        },
                      };

                      setFormData((prev) => ({
                        ...prev,
                        horarios: [...(prev.horarios || []), newHorario],
                        selectedDay: "",
                        startHourAM: "",
                        endHourAM: "",
                        startHourPM: "",
                        endHourPM: "",
                      }));
                    }

                  }}
                >
                  {t("i18n.professionals.054")}
                </Button>
              </Box>

            </Grid>

            {/* Columna derecha */}
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 2, borderRadius: 2, bgcolor: "grey.50" }}>
                <Typography variant="h6" gutterBottom align="center">
                  {t("i18n.professionals.055")}
                </Typography>
                {formData.horarios && formData.horarios.length > 0 ? (
                  <Box sx={{ maxHeight: 300, overflowY: "auto", pr: 1 }}>
                    {formData.horarios.map((h, index) => (
                      <Box
                        key={index}
                        sx={{
                          border: "1px solid #ccc",
                          borderRadius: 2,
                          p: 2,
                          mb: 1,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle1">
                            {daysOfWeek.find((d) => d.value === h.dia)?.label}
                          </Typography>
                          <Typography variant="body2">
                            {t("i18n.professionals.050")}: {h.manana.inicio || "--"} - {h.manana.fin || "--"}
                          </Typography>
                          <Typography variant="body2">
                            {t("i18n.professionals.053")}: {h.tarde.inicio || "--"} - {h.tarde.fin || "--"}
                          </Typography>
                        </Box>
                        <Button
                          color="error"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              horarios: prev.horarios.filter((_, i) => i !== index),
                            }))
                          }
                        >
                          {t("i18n.common.cancel")}
                        </Button>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary" align="center">
                    {t("i18n.professionals.056")}
                  </Typography>
                )}
              </Box>
            </Grid>

            {errors.repeatDays && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {errors.repeatDays}
              </Typography>
            )}

          </Grid>
        )
      case 2: // Confirmación de datos
        return <ConfirmationProfessionalData formData={formData} daysOfWeek={daysOfWeek} />
      case 3: // Success
        {
          if (successCreateProfessional) {
            professionalData = [
              { label: t("i18n.professionals.013"), value: formData.nombre },
              { label: t("i18n.professionals.014"), value: formData.apellido },
              { label: t("i18n.professionals.015"), value: formData.email },
              { label: t("i18n.professionals.016"), value: formData.telefono },
              { label: t("i18n.professionals.017"), value: formData.descripcion }
            ]
          }

        }
        return (
          successCreateProfessional ?
            <SuccessScreen title={t("i18n.professionals.041")} data={professionalData} onClose={onClose} />
            :
            <ErrorScreen title={t("i18n.common.006")} message={errorCreateProfessional} onClose={onClose} />

        )


    }
  }

  return (
    <Box sx={{ width: "100%", maxWidth: "100%", p: 2 }}>
      <Card elevation={3}>
        <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4, fontWeight: "bold" }}>
            {t('i18n.professionals.018')}
          </Typography>

          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{
              mb: 4,
              overflowX: { xs: "auto", sm: "visible" },
              '& .MuiStep-root': { minWidth: { xs: 80, sm: 'auto' } },
            }}
          >
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconComponent={({ active, completed }) => (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: { xs: 30, sm: 40 },
                        height: { xs: 30, sm: 40 },
                        borderRadius: "50%",
                        backgroundColor: completed ? "primary.main" : active ? "primary.light" : "grey.300",
                        color: completed || active ? "white" : "grey.600",
                      }}
                    >
                      {completed ? <CheckCircle fontSize={isMobile ? "small" : "medium"} /> : step.icon}
                    </Box>
                  )}
                >
                  <Typography sx={{ fontSize: { xs: "0.65rem", sm: "0.875rem" } }}>{step.label}</Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ maxWidth: 800, mx: "auto", p: 0 }}>
            {activeStep === 0 &&
              <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: "bold" }}>
                {t('i18n.professionals.010')}
              </Typography>
            }
            {activeStep === 1 &&
              <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: "bold" }}>
                {t('i18n.professionals.011')}
              </Typography>
            }
            {activeStep === 2 &&
              <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: "bold" }}>
                {t('i18n.common.010')}
              </Typography>
            }
            <Box sx={{ width: "100%" }}>{renderStepContent(activeStep)}</Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              {activeStep < steps.length - 1 && (
                <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
                  {t('i18n.common.007')}
                </Button>
              )}
              {activeStep === steps.length - 2 ? (
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  size={isMobile ? "small" : "medium"}
                  startIcon={
                    createProfessionalLoading
                      ? ""
                      : <CheckCircle fontSize={isMobile ? "small" : "medium"} />
                  }
                  sx={{
                    fontSize: isMobile ? "0.75rem" : "0.875rem",
                    padding: isMobile ? "4px 12px" : "6px 16px",
                  }}
                >
                  {createProfessionalLoading ? (
                    <CircularProgress size={isMobile ? 16 : 20} color="white" />
                  ) : (
                    t("i18n.common.009")
                  )}
                </Button>
              ) : activeStep < steps.length - 2 ? (
                <Button onClick={handleNext} variant="contained">
                  {t('i18n.common.008')}
                </Button>
              ) : null}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
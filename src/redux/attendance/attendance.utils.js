export const setAppointment = (appointments, appointmentToSet) => {
  const appointmentExists = appointments.find(
    (appointment) => appointment.Student.id === appointmentToSet.Student.id,
  );

  if (appointmentExists) {
    return appointments.map(
      (appointment) => {
        if (appointment.Student.id === appointmentToSet.Student.id) {
          return {
            ...appointmentToSet,
          };
        }
        return appointment;
      },
    );
  }

  return appointments;
};

export const getAge =(birthDate: string | Date): string => {
    const dob = new Date(birthDate);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    if (age <= 0) {
      return '< 1 an';
    }

    return age + ' ' + (age > 1 ? 'ans' : 'an');
  }

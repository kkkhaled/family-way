export const url = 'https://familyway.sa/api/user/'

export const urlImages = 'https://familyway.sa/uploads/'

export const convertPaymentText = value => {
  let result
  switch (value) {
    case 1: {
      result = 'عند الأستلام'
      break
    }
    case 2: {
      result = 'بالبطاقة عند الأستلام'
      break
    }
    case 3: {
      result = 'دفع عن طريق المحفظة'
      break
    }
    case 4: {
      result = 'دفع عن طريق النقط'
      break
    }
  }
  return result
}
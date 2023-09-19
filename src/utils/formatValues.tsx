// import { dataFirebase } from '../../src/testeprojeto-54a53-default-rtdb-export'

// export const formatValue = () => {
//   const dates = getDates()
//   const cards = getCard(dataFirebase)
//   const peoples = getPeople(dataFirebase)
//   const categorys = getCategory(dataFirebase)
//   const will = getWill(dataFirebase)
//   console.log(will)
//   console.log(categorys)
//   console.log(peoples)
//   console.log(cards)
//   console.log(dates)
// }

// const getDates = () => {
//   return Object.keys(dataFirebase)
// }

// const getCard = (data) => {
//   const cards = new Set()
//   Object.keys(data).forEach((date) => {
//     if (date !== 'emprestimo') {
//       Object.keys(data[date]).forEach((card) => cards.add(card))
//     }
//   })
//   return cards
// }

// const getPeople = (data) => {
//   const peoples = new Set()
//   Object.keys(data).forEach((date) => {
//     if (date !== 'emprestimo') {
//       Object.keys(data[date]).forEach((card) => {
//         Object.keys(data[date][card]).forEach((people) => people !== 'cor' && peoples.add(people))
//       })
//     }
//   })
//   return peoples
// }

// const getCategory = (data) => {
//   const categorys = new Set()
//   Object.keys(data).forEach((date) => {
//     if (date !== 'emprestimo') {
//       Object.keys(data[date]).forEach((card) => {
//         Object.keys(data[date][card]).forEach((people) => {
//           if (people !== 'cor') {
//             Object.keys(data[date][card][people]).forEach((category) => {
//               return categorys.add(data[date][card][people][category]['categoria'])
//             })
//           }
//         })
//       })
//     }
//   })
//   return categorys
// }

// const getWill = (data) => {
//   const body = []
//   Object.keys(data).forEach((date) => {
//     if (date !== 'emprestimo') {
//       Object.keys(data[date]).forEach((card) => {
//         Object.keys(data[date][card]).forEach((people) => {
//           if (people !== 'cor') {
//             Object.keys(data[date][card][people]).forEach((category) => {
//               body.push({
//                 "item": category,
//                 "value": data[date][card][people][category].valor,
//                 "card": card,
//                 "people": people,
//                 "category": data[date][card][people][category].categoria,
//                 "description": "",
//                 "username": "LucasNery513522",
//                 "date": date[0].toUpperCase() + date.substring(1)
//               })
//             })
//           }
//         })
//       })
//     }
//   })
//   return body
// }
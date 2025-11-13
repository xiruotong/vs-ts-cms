// import { Coordinate } from '@element-plus/icons-vue/dist/types'

import { coordinateData } from './coordinate-data'

export function convertData(data: any) {
  const res = []
  for (let i = 0; i < data.length; i++) {
    const geoCoord = coordinateData[data[i].name]
    // console.log(geoCoord)
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      })
    }

    // console.log(res)
  }
  return res
}

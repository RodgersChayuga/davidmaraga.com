import { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  fields: [
   
        {
            type:"collapsible",
            label:"Profile",
            fields:[
                {
                    name:"title",
                    type:"text"
                },
                {
                    name:"description",
                    type:"textarea"
                },
                {
                    name:"image",
                    type:"upload",
                    relationTo:"media"
                },
                {
                    type:"array",
                    name:"attributes",
                    fields:[
                        {
                            name:"title",
                            type:"text"
                        },
                        {
                            name:"description",
                            type:"textarea"
                        }
                    ]
                },
              
            ]
        }
      ],
   
}
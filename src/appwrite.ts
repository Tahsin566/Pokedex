
import { Client, Databases, ID, Query } from 'appwrite'
import { Pokemon } from './types/PokemonTypes'

const project_id = import.meta.env.VITE_APPWRITE_PROJECT_ID ? import.meta.env.VITE_APPWRITE_PROJECT_ID : ""
const database_id = import.meta.env.VITE_APPWRITE_DATABASE_ID ? import.meta.env.VITE_APPWRITE_DATABASE_ID : ""
const collection_id = import.meta.env.VITE_APPWRITE_COLLECTION_ID ? import.meta.env.VITE_APPWRITE_COLLECTION_ID : ""

const client = new Client()
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject(project_id)

const database = new Databases(client)

export const updatesearchcount = async(searchtext:string,pokemon:Pokemon)=> {

    try {

        const result  = await database.listDocuments(database_id,collection_id,[Query.equal('searchtext',searchtext)])

        // if the documents exists already 

        if(result.documents.length > 0){

            const doc = result.documents[0]

            await database.updateDocument(database_id,collection_id,doc.$id,{
                count:doc.count + 1
            })
        }
        else{
            // if the document does not exist

            await database.createDocument(database_id,collection_id,ID.unique(),{
                searchtext,
                count:1,
                name:pokemon.name,
                id : pokemon.id,
                sprites: pokemon.sprites.other.home.front_default
            })
        }

    } catch (error) {
        
    }
}

export const getFavPokemon = async()=> {

    try {
        const result = await database.listDocuments(database_id,collection_id,[
            Query.limit(5),
            Query.orderDesc('count')
        ])
        
        return result.documents

    } catch (error) {
        
        console.log(error)
    }

}


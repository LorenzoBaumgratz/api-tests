import supertest from "supertest";
import app from "../src/app";

const server = supertest(app)

describe("testes",()=>{
    it("should return 201 when inserting a fruit",async()=>{
        const result=await server.post("/fruits").send({
            name:"banana",
            price:5
        })
        expect(result.status).toBe(201)
    })

    it("should return 409 when inserting a fruit that is already registered",async()=>{
        const result=await server.post("/fruits").send({
            name:"banana",
            price:5
        })
        expect(result.status).toBe(409)
    })

    it("should return 422 when inserting a fruit with data missing",async()=>{
        const result=await server.post("/fruits").send({
            name:"banana"
        })
        expect(result.status).toBe(422)

    })

    it("shoud return 404 when trying to get a fruit that doesn't exists",async()=>{
        const result=await server.get("/fruits/20")
        expect(result.status).toBe(404)

    })

    it("should return 400 when id param is not valid",async()=>{
        const result=await server.get("/fruits/banana")
        expect(result.status).toBe(400)

    })

    it("should return a fruit given an id",async()=>{
        const result=await server.get("/fruits/1")
        expect(result.body).toEqual(
            expect.objectContaining({
                id:expect.any(Number),
                name:expect.any(String),
                price:expect.any(Number)
            })
        )

    })

    it("should return all fruits",async()=>{
        const result=await server.get("/fruits")
        expect(result.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id:expect.any(Number),
                    name:expect.any(String),
                    price:expect.any(Number)
                })
            ])
        )
    })
})
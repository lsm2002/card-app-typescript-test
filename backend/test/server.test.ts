import { server } from "../src/server"
import Prisma from "../src/db";

interface EntryIn {
  id: string;
  title: string;
  description: string;
  created_at: string;
  scheduled_for: string;
}

interface EntryOut {
  title: string;
  description: string;
  created_at: string;
  scheduled_for: string;
}

interface Entry {
  id: string;
  title: string;
  description: string;
  created_at: Date;
  scheduled_for: Date | null;
}

const mockEntry1: EntryOut = {
  title: "mockentry1",
  description: "",
  created_at: "2024-12-16T01:21:38.319Z",
  scheduled_for: "2024-12-16T01:21:38.319Z",
}
const mockEntry2: EntryOut = {
  title: "mockentry2",
  description: "this is a test",
  created_at: "2002-11-16T00:00:00.000Z",
  scheduled_for: "2022-11-16T00:00:00.000Z",
}
const badEntry: EntryOut = {
  title: "badentry",
  description: "this is a test",
  created_at: "bad",
  scheduled_for: "",
}

const entryFields = ["id", "title", "description", "created_at", "scheduled_for"];


describe("server test", () => {
  it("get response 200 and valid data", async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/get/'
    })
    expect(response.statusCode).toStrictEqual(200);
    
    expect(() => {JSON.parse(response.body)}).not.toThrow();
    const entries: EntryIn[] = JSON.parse(response.body);
    expect(entries).toBeInstanceOf(Array);
  
    entries.forEach((entry) => {
      let fields = Object.keys(entry)
      expect(fields).toEqual(entryFields)
  
      const created_at = new Date(entry.created_at)  
      expect(created_at.toString()).not.toEqual("Invalid Date")
  
      if (entry.scheduled_for != "null") {
        const scheduled_for = new Date(entry.scheduled_for)
        expect(scheduled_for.toString()).not.toEqual("Invalid Date")
      }
    })
  });

  it("post response 200 and valid data", async () => {
    const mockEntryIn = mockEntry1
    const response = await server.inject({
      method: 'POST',
      url: '/create/',
      payload: mockEntryIn,
    })
    expect(response.statusCode).toStrictEqual(200);

    expect(() => {JSON.parse(response.body)}).not.toThrow();
    const entry: EntryIn = JSON.parse(response.body);
  
    let fields = Object.keys(entry)
    expect(fields).toEqual(entryFields)

    const created_at = new Date(entry.created_at)  
    expect(created_at.toString()).not.toEqual("Invalid Date")

    if (entry.scheduled_for != "null") {
      const scheduled_for = new Date(entry.scheduled_for)
      expect(scheduled_for.toString()).not.toEqual("Invalid Date")
    }
    fields.forEach((field) => {
      if (field != "id") {
        expect(Object(entry)[field]).toEqual(Object(mockEntryIn)[field])
      }
    })
  });

  it("post response 500 on bad entry", async () => {
    const mockEntryIn = badEntry
    const response = await server.inject({
      method: 'POST',
      url: '/create/',
      payload: mockEntryIn,
    })
    expect(response.statusCode).toEqual(500)
  });

  it("get valid matching data after post", async () => {
    const mockEntryIn = mockEntry1
    const response = await server.inject({
      method: 'POST',
      url: '/create/',
      payload: mockEntryIn,
    })
    expect(() => {JSON.parse(response.body)}).not.toThrow();
    const entry: EntryIn = JSON.parse(response.body);
  
    let fields = Object.keys(entry)
    expect(fields).toEqual(entryFields)

    const response2 = await server.inject({
      method: 'GET',
      url: '/get/'
    })
    
    expect(() => {JSON.parse(response2.body)}).not.toThrow();
    const entries: EntryIn[] = JSON.parse(response2.body);
    expect(entries).toBeInstanceOf(Array);
    
    const filteredEntries = entries.filter((entry2) => {return entry2.id == entry.id})
    expect(filteredEntries.length).toEqual(1)
    const entry2 = filteredEntries[0];

    fields.forEach((field) => {
      if (field != "id") {
        expect(Object(entry2)[field]).toEqual(Object(mockEntryIn)[field])
      }
      expect(Object(entry2)[field]).toEqual(Object(entry)[field])
    })
      
  });

  it("get by id response 200 and valid matching data after post", async () => {
    const mockEntryIn = mockEntry2
    const response = await server.inject({
      method: 'POST',
      url: '/create/',
      payload: mockEntryIn,
    })
    expect(() => {JSON.parse(response.body)}).not.toThrow();
    const entry: EntryIn = JSON.parse(response.body);
  
    let fields = Object.keys(entry)
    expect(fields).toEqual(entryFields)

    const response2 = await server.inject({
      method: 'GET',
      url: '/get/'+entry.id,
    })
    expect(response2.statusCode).toEqual(200)

    expect(() => {JSON.parse(response2.body)}).not.toThrow();
    const entry2: EntryIn = JSON.parse(response2.body);
  
    let fields2 = Object.keys(entry2)
    expect(fields2).toEqual(entryFields)

    const created_at2 = new Date(entry2.created_at)  
    expect(created_at2.toString()).not.toEqual("Invalid Date")

    if (entry2.scheduled_for != "null") {
      const scheduled_for2 = new Date(entry2.scheduled_for)
      expect(scheduled_for2.toString()).not.toEqual("Invalid Date")
    }
    fields2.forEach((field) => {
      if (field != "id") {
        expect(Object(entry2)[field]).toEqual(Object(mockEntryIn)[field])
      }
      expect(Object(entry2)[field]).toEqual(Object(entry)[field])
    })
  });

  it("get by id response 500 on not exist", async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/get/fake-id',
    })
    expect(response.statusCode).toEqual(500)
  });

  it("delete by id response 200 and doesn't exist after delete", async () => {
    const mockEntryIn = mockEntry2
    const response = await server.inject({
      method: 'POST',
      url: '/create/',
      payload: mockEntryIn,
    })
    expect(() => {JSON.parse(response.body)}).not.toThrow();
    const entry: EntryIn = JSON.parse(response.body);
  
    let fields = Object.keys(entry)
    expect(fields).toEqual(entryFields)

    const response2 = await server.inject({
      method: 'DELETE',
      url: '/delete/'+entry.id,
    })
    expect(response2.statusCode).toEqual(200)

    const response3 = await server.inject({
      method: 'GET',
      url: '/get/'+entry.id,
    })
    expect(response3.statusCode).toEqual(500)
  });

  it("delete response 500 on not exist", async () => {
    const response = await server.inject({
      method: 'DELETE',
      url: '/delete/fake-id',
    })
    expect(response.statusCode).toEqual(500)
  });

  it("update response 200 and valid data", async () => {
    const mockEntryIn = mockEntry1
    const response = await server.inject({
      method: 'POST',
      url: '/create/',
      payload: mockEntryIn,
    })
    expect(() => {JSON.parse(response.body)}).not.toThrow();
    const entry: EntryIn = JSON.parse(response.body);
  
    let fields = Object.keys(entry)
    expect(fields).toEqual(entryFields)

    const mockEntryIn2 = mockEntry2
    const response2 = await server.inject({
      method: 'PUT',
      url: '/update/'+entry.id,
      payload: mockEntryIn2,
    })
    expect(response2.statusCode).toEqual(200)

    const response3 = await server.inject({
      method: 'GET',
      url: '/get/'+entry.id,
    })
    expect(response3.statusCode).toEqual(200)

    expect(() => {JSON.parse(response3.body)}).not.toThrow();
    const entry2: EntryIn = JSON.parse(response3.body);
  
    let fields2 = Object.keys(entry2)
    expect(fields2).toEqual(entryFields)

    const created_at2 = new Date(entry.created_at)
    expect(created_at2.toString()).not.toEqual("Invalid Date")

    if (entry2.scheduled_for != "null") {
      const scheduled_for2 = new Date(entry2.scheduled_for)
      expect(scheduled_for2.toString()).not.toEqual("Invalid Date")
    }
    fields2.forEach((field) => {
      if (field != "id") {
        expect(Object(entry2)[field]).toEqual(Object(mockEntryIn2)[field])
      }
    })
  });

  it("update response 500 on not exist", async () => {
    const mockEntryIn = mockEntry2
    const response = await server.inject({
      method: 'PUT',
      url: '/update/fake-id',
      payload: mockEntryIn,
    })
    expect(response.statusCode).toEqual(500)
  });
  
  it("update response 500 on bad entry", async () => {
    const mockEntryIn = mockEntry1
    const response = await server.inject({
      method: 'POST',
      url: '/create/',
      payload: mockEntryIn,
    })
    expect(() => {JSON.parse(response.body)}).not.toThrow();
    const entry: EntryIn = JSON.parse(response.body);
  
    let fields = Object.keys(entry)
    expect(fields).toEqual(entryFields)

    const mockEntryIn2 = badEntry
    const response2 = await server.inject({
      method: 'PUT',
      url: '/update/'+entry.id,
      payload: mockEntryIn2,
    })
    expect(response2.statusCode).toEqual(500)
  });
});
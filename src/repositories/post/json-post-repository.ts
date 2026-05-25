import { PostModel } from "@/models/post/post-model";
import { readFile } from "fs/promises";
import { PostRepository } from "./post-repository";

//pegando a raiz do projeto
const ROOT_DIR = process.cwd();
const JSON_FILE_PATH = `${ROOT_DIR}/src/db/seed/posts.json`;

export class JsonPostRepository implements PostRepository {
  private async readJsonFile() {
    const jsonContent = await readFile(JSON_FILE_PATH, "utf-8");
    const parseJson = JSON.parse(jsonContent);
    const { posts } = parseJson;
    return posts;
  }

  async findAll(): Promise<PostModel[]> {
    const posts = await this.readJsonFile();
    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    const posts = await this.findAll();
    const post = posts.find((post) => post.id === id);
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  }
}

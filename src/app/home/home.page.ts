import { Component } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  fileName: string = '';
  fileContent: string = '';
  filelist: string[] = [];

  constructor() {}

  async createFile() {
    try {
      await Filesystem.writeFile({
        path: this.fileName,
        data: this.fileContent,
        directory: Directory.Documents,
      });
      alert('File created successfully!');
      this.refreshFilelist();
    } catch (error) {
      console.error('Error creating file', error);
    }
  }

  async readFile() {
    try {
      const contents = await Filesystem.readFile({
        path: this.fileName,
        directory: Directory.Documents,
      });
      this.fileContent = contents.data.toString();
      alert('File content loaded!');
    } catch (error) {
      console.error('Error reading file', error);
    }
  }

  async deleteFile() {
    try {
      await Filesystem.deleteFile({
        path: this.fileName,
        directory: Directory.Documents,
      });
      alert('File deleted successfully!');
      this.refreshFilelist();
    } catch (error) {
      console.error('Error deleting file', error);
    }
  }

  async refreshFilelist() {
    try {
      const result = await Filesystem.readdir({
        path: '',
        directory: Directory.Documents,
      });
      this.filelist = result.files.map(file => file.name);
    } catch (error) {
      console.error('Error reading directory', error);
    }
  }
}

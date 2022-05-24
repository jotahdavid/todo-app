class LocalStorageHelper {

  constructor(defaultKey) {
    this.key = defaultKey;
  }

  getAll() {
    return JSON.parse(localStorage.getItem(this.key));
  }

  getById(id) {
    return this.getAll().find(item => item.id === id);
  }

  save(value) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  update(id, value) {
    const values = this.getAll();
    const itemIndex = values.findIndex(item => item.id === id);
    if (itemIndex === -1) return false;
    values[itemIndex] = value;
    this.save(values);
    return true;
  }

  delete(id) {
    const values = this.getAll();
    const itemIndex = values.findIndex(item => item.id === id);
    if (itemIndex === -1) return false;
    values.splice(itemIndex, 1);
    this.save(values);
    return true;
  }

  deleteAllMatch(matchFunction) {
    const values = this.getAll();
    this.save(
      values.filter(item => !matchFunction(item))
    );
  }

  updateKey(newKey) {
    this.key = newKey;
  }

}

export default LocalStorageHelper;

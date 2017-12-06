from sklearn.neural_network import MLPClassifier

X = [[1, 1], [1, -1], [-1, 1], [-1, -1], [-2, -2], [1, 3], [-1, 3]]
y = [0, 1, 1, 0, 0, 0, 1]
clf = MLPClassifier(solver='lbfgs', alpha=.001, hidden_layer_sizes=(5, 2), random_state=10000)
clf.fit(X, y)
res = clf.predict(X)
print(res)

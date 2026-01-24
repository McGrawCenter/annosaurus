class AnnotoriousAnno {

  constructor(anno) {

    this['@context'] = "http://www.w3.org/ns/anno.jsonld";
    this.type = "Annotation";
    this.id = anno.id;
    this.body = [{"type": "TextualBody","value": anno.body[0].value,"purpose": "commenting" }];
    this.target = {
       "source": anno.body[1].service.id,
       "selector": {
         "type": "FragmentSelector",
        "conformsTo": "http://www.w3.org/TR/media-frags/",
         "value": anno.target.source.selector.value
       }
    }
  }

}

